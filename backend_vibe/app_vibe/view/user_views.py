from app_vibe.serializer import UserProfileSerializer, UserSerializer
from app_vibe.models import User
# from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

@api_view(['GET'])
def user_detail(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    serializer = UserProfileSerializer(user)
    return Response(serializer.data)

@api_view(["GET", "PATCH"])
def user_config(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    
    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif request.method == "PATCH":
        serializer = UserSerializer(user, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)