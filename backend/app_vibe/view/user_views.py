from app_vibe.serializer import UserSerializer, AvatarImageSerializer
from app_vibe.models import User, AvatarUser
from app_vibe.services.supabase_service import SupabaseUploadUserFill
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import (
    authentication_classes,
    permission_classes,
    parser_classes
)
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import logging

logger = logging.getLogger(__name__)

# Este es para mostrar cuando un user ve la info de otro user
class UserDetail(APIView):
    def get(self, request, user_id):

        # Conceguimos al user con su id
        user = get_object_or_404(User, pk=user_id)

        # Buscamos y mostramos la info del user
        serializer = UserSerializer(user)
        return Response(serializer.data)


# Este es para mostrar cuando un user ve su propia info y quiere cambiarla
class UserConfig(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def get(self, request, user_id):
        # Verificar que el usuario solo pueda acceder a su propia información
        if request.user.id != user_id:
            return Response(
                {"error": "No tienes permisos para acceder a esta información"},
                status=status.HTTP_403_FORBIDDEN
            )

        user = get_object_or_404(User, pk=user_id)
        serializer = UserSerializer(user)
        
        # Incluir información del avatar en la respuesta
        latest_avatar = AvatarUser.objects.filter(user=user).order_by("-upload_date").first()
        response_data = serializer.data
        response_data["avatar"] = AvatarImageSerializer(latest_avatar).data if latest_avatar else None

        return Response(response_data)
    
    def patch(self, request, user_id):
        # Verificar que el usuario solo pueda modificar su propia información
        if request.user.id != user_id:    
            return Response(
                {"error": "No tienes permisos para acceder a esta información"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        user = get_object_or_404(User, pk=user_id)
        
        # Manejar subida de avatar si viene un archivo
        if "avatar" in request.FILES:
            return self._handle_avatar_upload(request, user)
        
        # Manejar actualizacion de datos normales del usuario
        return self._handle_user_update(request, user)
    
    def _handle_avatar_upload(self, request, user):
        """Maneja la subida del avatar"""
        storage = SupabaseUploadUserFill()
        
        try:
            file = request.FILES["avatar"]
            
            # Validar el archivo recibido
            storage.validate_file(file)
            
            # 1. eliminar avatar anterior si existe
            previous_avatars = AvatarUser.objects.filter(user=user)
            
            # Eliminar de supabase storage primero
            for avatar in previous_avatars:
                try:
                    storage.delete_file(avatar.file_path)
                except Exception as e:
                    logger.error(f"Error deleting old avatar from storage: {str(e)}")
            
            # Ekiminar registros de la base de datos
            previous_avatars.delete()
            
            # 2. Subir nuevo avatar
            file_url = storage.upload_avatar_user(
                file=file,
                user_id=user.id
            )
            
            # 3. Crear nuevo registro
            AvatarUser.objects.create(
                user=user,
                file_path=file_url,
                file_type=file.content_type,
                file_size=file.size
            )
            
            # Obtener el avatar mas reciente
            latest_avatar = AvatarUser.objects.filter(user=user).order_by("-upload_date").first()
            
            return Response({
                "message": "Avatar actualizado exitosamente",
                "user": UserSerializer(user).data,
                "avatar": AvatarImageSerializer(latest_avatar).data if latest_avatar else None
            }, status=status.HTTP_200_OK)
            
        except ValidationError as e:
            return Response({f"error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Error uploading avatar: {str(e)}")
            return Response(
                {"error": "Error interno del servidor"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        
class UserAvatar(APIView):
    @parser_classes([MultiPartParser, FormParser])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        if "file"  not in request.FILES:
            return Response(
                {"error": "no file provider"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        storage = SupabaseUploadUserFill()
        uploaded_files = []
        
        try:
            
            file = request.FILES['file']
            # validar el archivo resivido
            storage.validate_file(file)
            
            # 1. Eliminar avatar anterior si existe
            previus_avatars = AvatarUser.objects.filter(user=request.user)   
            
            # Eliminar de supabase storege primero
            for avatar in previus_avatars:
                try:
                    storage.delete_file(avatar.file_path)
                except Exception as e:
                    logger.error(f"Error deleting old avatar from storage: {str(e)}")
            
            # Eliminar registros de la base de datos
            previus_avatars.delete()
            
            # 2. Subir nuevo avatar
            file_url = storage.upload_avatar_user(
                file=file,
                user_id=request.user.id
            )
            
            # 3. Crear nuevo registro
            file_instance = AvatarUser.objects.create(
                user=request.user,
                file_path=file_url,
                file_type=file.content_type,
                file_size=file.size
            )
            uploaded_files.append(file_url)
            latest_avatar = AvatarUser.objects.filter(user=request.user).order_by('-upload_date').first()

            return Response({
                "user": UserSerializer(request.user).data,
                "avatar": AvatarImageSerializer(latest_avatar).data if latest_avatar else None,
                "uploaded_file": file_url
            }, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Error uploading avatar: {str(e)}")
            return Response(
                {'error': 'Internal server error'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
