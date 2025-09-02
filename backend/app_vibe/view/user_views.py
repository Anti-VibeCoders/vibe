from app_vibe.serializer import UserSerializer, AvatarImageSerializer, BackgroundUser, BackgroundImageSerializer
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
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    @parser_classes([MultiPartParser, FormParser, JSONParser])
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
        
        # Manejar tanto datos como avatar simultáneamente
        return self._handle_combined_update(request, user)
    
    def _handle_combined_update(self, request, user):
        """Maneja la actualización combinada de datos y avatar"""
        
        # 1. Procesar avatar si viene en la solicitud
        if "avatar" in request.FILES:
            avatar_result = self._process_avatar_upload(request.FILES["avatar"], user)
            if isinstance(avatar_result, Response):
                return avatar_result  # Retornar error si hay problema con el avatar
        
        # Procesar background si vienen en la solicitud
        if "background" in request.FILES:
            background_result = self._process_background_upload(request.FILES["background"], user)
            if isinstance(background_result, Response):
                return avatar_result # Retornar error si hay problema con el avatar
        
        # 2. Procesar datos del usuario
        # Crear una copia mutable de request.data
        data = request.data.copy()
        
        # Remover el campo 'avatar' si existe para evitar conflictos con el serializer
        if 'avatar' in data:
            del data['avatar']
        
        if 'background' in data:
            del data['background']
        
        serializer = UserSerializer(user, data=data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            
            # Preparar respuesta
            response_data = serializer.data
            
            # Incluir información del avatar actualizado
            latest_avatar = AvatarUser.objects.filter(user=user).order_by("-upload_date").first()
            response_data["avatar"] = AvatarImageSerializer(latest_avatar).data if latest_avatar else None
            
            return Response({
                "user": response_data
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def _process_avatar_upload(self, file, user):
        """Procesa la subida del avatar y retorna los datos o Response de error"""
        storage = SupabaseUploadUserFill()
        
        try:
            # Validar el archivo recibido
            storage.validate_file(file)
            
            # 1. Eliminar avatar anterior si existe
            previous_avatars = AvatarUser.objects.filter(user=user)
            
            # Eliminar de supabase storage primero
            for avatar in previous_avatars:
                try:
                    storage.delete_file(avatar.file_path)
                except Exception as e:
                    logger.error(f"Error deleting old avatar from storage: {str(e)}")
            
            # Eliminar registros de la base de datos
            previous_avatars.delete()
            
            # 2. Subir nuevo avatar
            file_url = storage.upload_avatar_user(
                file=file,
                user_id=user.id
            )
            
            # 3. Crear nuevo registro
            avatar_instance = AvatarUser.objects.create(
                user=user,
                file_path=file_url,
                file_type=file.content_type,
                file_size=file.size
            )
            
            return AvatarImageSerializer(avatar_instance).data
            
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Error uploading avatar: {str(e)}")
            return Response(
                {"error": "Error interno del servidor al subir avatar"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    def _process_background_upload(self, file, user):
        """Procesa la subida del background y retorna los datos o Response de error"""
        storage = SupabaseUploadUserFill()
        
        try:
            # Validar el archivo recibido
            storage.validate_file(file)
            
            # 1. Eliminar avatar anterior si existe
            previous_background = BackgroundUser.objects.filter(user=user)
            
            # Eliminar de supabase storage primero
            for background in previous_background:
                try:
                    storage.delete_file(background.file_path)
                except Exception as e:
                    logger.error(f"Error deleting old avatar from storage: {str(e)}")
            
            # Eliminar registros de la base de datos
            previous_background.delete()
            
            # 2. Subir nuevo avatar
            file_url = storage.upload_background_user(
                file=file,
                user_id=user.id
            )
            
            # 3. Crear nuevo registro
            avatar_instance = BackgroundUser.objects.create(
                user=user,
                file_path=file_url,
                file_type=file.content_type,
                file_size=file.size
            )
            
            return BackgroundImageSerializer(avatar_instance).data
            
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Error uploading Background: {str(e)}")
            return Response(
                {"error": "Error interno del servidor al subir el Background"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )