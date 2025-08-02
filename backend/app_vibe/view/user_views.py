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
from rest_framework.parsers import MultiPartParser, FormParser
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
    def get(self, request, user_id):
        # Conceguimos al user con su id
        user = get_object_or_404(User, pk=user_id)

        # Buscamos y mostramos la info del user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def patch(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
            
            storage.validate_file(file)
            
            file_url = storage.upload_avatar_user(
                file=file,
                user_id=request.user.id
            )
            
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
