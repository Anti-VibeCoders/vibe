from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from app_vibe.models import Post, FilesPost
from app_vibe.serializer import PostSerializer, FilesPostSerializer

class PostView(APIView):
    def get(self, request):
        queryset = Post.objects.prefetch_related("filespost_set").all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PostCreateView(APIView):
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        try:
            # Validar y crear post
            post_data = {
                "content": request.data.get("content"),
                "user": request.user.id
            }
            post_serializer = PostSerializer(data=post_data, context={'request': request})
            post_serializer.is_valid(raise_exception=True)
            post = post_serializer.save()
            
            # Procesar archivos
            files = request.FILES.getlist("files")
            uploaded_files = []
            
            for file in files:
                file_data = {
                    "post": post.id,
                    "user": request.user.id,
                    "temp_file": file
                }
                
                file_serializer = FilesPostSerializer(data=file_data)
                
                file_serializer.is_valid(raise_exception=True)
                
                
                file_instance = file_serializer.save()
                uploaded_files.append(file_instance.file_path)
            
            # Añade las URLs al response
            print("response final")
            response_data = post_serializer.data
            print("response final con files")
            response_data['files'] = uploaded_files
            return Response(response_data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            if 'post' in locals():
                post.delete()  # Rollback si hay error
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

