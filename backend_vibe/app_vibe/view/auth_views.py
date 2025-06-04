from app_vibe.serializer import RegistroSerializer, LoginSerializer
from app_vibe.models import User
# from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

class RegistroViewSet(APIView):
    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            
            # Puedes devolver datos del usuario sin la contraseña
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
            return Response({
                "Token": token.key,
                "user": user_data,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(APIView):
    def post(self, request):
        user = get_object_or_404(User, username=request.data["username"])
    
        if not user.check_password(request.data["password"]):
         return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        
        token, create = Token.objects.get_or_create(user=user)
        serializer = LoginSerializer(user)
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)
    
class LogoutViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
