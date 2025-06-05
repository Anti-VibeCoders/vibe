from app_vibe.serializer import ComentarioSerializer
from app_vibe.models import Comentario
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

class CommentarioView(APIView):
    def get(self, request):
        queryset = Comentario.objects.all()
        serializer = ComentarioSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CommentarioCreateView(APIView):
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        serializer = ComentarioSerializer(data=request.data)
    
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
