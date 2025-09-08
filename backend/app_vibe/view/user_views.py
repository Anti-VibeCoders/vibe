from app_vibe.serializer import (
    UserSerializer, 
    AvatarImageSerializer, 
    BannerUser, 
    BannerImageSerializer
)
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
        return self._get_user_response(user)
    
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
    
    def _get_user_response(self, user):
        """Genera la respuesta completa del usuario"""
        serializer = UserSerializer(user)
        response_data = serializer.data
        
        # Incluir información del avatar
        latest_avatar = AvatarUser.objects.filter(user=user).order_by("-upload_date").first()
        response_data["avatar"] = AvatarImageSerializer(latest_avatar).data if latest_avatar else None
        
        # Incluir información del Banner
        latest_Banner = BannerUser.objects.filter(user=user).order_by("-upload_date").first()
        response_data["Banner"] = BannerImageSerializer(latest_Banner).data if latest_Banner else None

        return Response(response_data)
    
    def _handle_combined_update(self, request, user):
        """Maneja la actualización combinada de datos y archivos"""
        
        # Procesar archivos (avatar y Banner)
        file_errors = self._process_uploaded_files(request, user)
        if file_errors:
            return file_errors
        
        # Procesar datos del usuario
        return self._process_user_data(request, user)
    
    def _process_uploaded_files(self, request, user):
        """Procesa todos los archivos subidos y retorna errores si los hay"""
        file_handlers = {
            "avatar": {
                'model': AvatarUser,
                'upload_method': 'upload_avatar_user',
                'serializer': AvatarImageSerializer
            },
            "Banner": {
                'model': BannerUser,
                'upload_method': 'upload_Banner_user',
                'serializer': BannerImageSerializer
            }
        }
        
        storage = SupabaseUploadUserFill()
        
        for file_field, handler in file_handlers.items():
            if file_field in request.FILES:
                result = self._process_file_upload(
                    storage=storage,
                    file=request.FILES[file_field],
                    user=user,
                    model_class=handler["model"],
                    upload_method=getattr(storage, handler["upload_method"]),
                    serializer_class=handler['serializer']
                )
                if isinstance(result, Response):
                    return result  # Retornar error si hay problema
        return None  # Todo salió bien
    
    def _process_file_upload(self, storage, file, user, model_class, upload_method, serializer_class):
        """Procesa genéricamente la subida de cualquier archivo"""
        try:
            # Validar archivo
            storage.validate_file(file)
            
            # 1. eliminar archivos anteriores
            previous_files = model_class.objects.filter(user=user)
            
            # Eliminar de supabase storage primero
            for file_instance in previous_files:
                try:
                    storage.delete_file(file_instance.file_path)
                except Exception as e:
                    logger.error(f"Error deleting old file from storage: {str(e)}")

            # Eliminar registros de la base de datos
            previous_files.delete()
            
            # 2. subir nuevo archivo
            file_url = upload_method(file=file, user_id=user.id)
            
            # 3. Crear nuevo registro
            file_instance = model_class.objects.create(
                user=user,
                file_path=file_url,
                file_type=file.content_type,
                file_size=file.size
            )
            
            return serializer_class(file_instance).data
            
        except ValidationError as e:
            return Response({"error": f"Error validando archivo: {str(e)}"}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            logger.error(f"Error uploading file: {str(e)}")
            return Response(
                {"error": "Error interno del servidor al subir archivo"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _process_user_data(self, request, user):
        """Procesa la actualización de datos del usuario"""
        # Crear una copia mutable de request.data
        data = request.data.copy()
        
        # Remover campos de archivos para evitar conflictos con el serializer
        for file_field in ['avatar', 'Banner']:
            if file_field in data:
                del data[file_field]
        
        serializer = UserSerializer(user, data=data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "user": self._get_user_response_data(user)
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _get_user_response_data(self, user):
        """Obtiene los datos del usuario para la respuesta"""
        serializer = UserSerializer(user)
        response_data = serializer.data
        
        # Incluir información del avatar
        latest_avatar = AvatarUser.objects.filter(user=user).order_by("-upload_date").first()
        response_data["avatar"] = AvatarImageSerializer(latest_avatar).data if latest_avatar else None
        
        # Incluir información del Banner
        latest_Banner = BannerUser.objects.filter(user=user).order_by("-upload_date").first()
        response_data["Banner"] = BannerImageSerializer(latest_Banner).data if latest_Banner else None
        
        return response_data
