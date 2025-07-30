from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    authentication_classes,
    permission_classes,
    parser_classes
)
from app_vibe.models import Post, FilesPost
from app_vibe.serializer import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from app_vibe.services.supabase_service import SupabaseStorageService
from django.db.models import Prefetch
import logging

logger = logging.getLogger(__name__)


class PostView(APIView):
    def get(self, request):
        # 1. Obtenemos los posts con sus archivos relacionados
        queryset = Post.objects.prefetch_related(
            Prefetch(
                'filespost_set',
                queryset=FilesPost.objects.select_related('user'),
                to_attr='archivos'  # Nombre más claro para la relación
            )
        ).all()

        # 2. Serializamos los datos
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostCreateView(APIView):
    @parser_classes([MultiPartParser, FormParser])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        try:
            # 1. Crear el post
            post = Post.objects.create(
                content=request.data.get("content"),
                user=request.user
            )

            uploaded_files = []
            storage = SupabaseStorageService()

            for file in request.FILES.getlist('files'):
                try:
                    # 2. Subir archivo a Supabase
                    file_url = storage.upload_to_posts(
                        file=file,
                        post_id=post.id,
                        user_id=request.user.id
                    )

    # 3. Crear registro en FilesPost (¡ESTE ES EL PASO QUE FALTABA!)
                    file_instance = FilesPost.objects.create(
                        post=post,
                        user=request.user,
                        file_path=file_url,
                        file_type=file.content_type,
                        file_size=file.size
                    )

                    uploaded_files.append(file_url)

                except Exception as e:
                    logger.error(f"Error procesando {file.name}: {str(e)}")
                    continue

            return Response({
                **PostSerializer(post).data,
                'files': uploaded_files
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            if 'post' in locals():
                post.delete()
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
