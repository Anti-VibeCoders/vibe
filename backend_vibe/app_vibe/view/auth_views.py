from app_vibe.serializer import RegistroSerializer, LoginSerializer
from app_vibe.models import User
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

class RegistroViewSet(APIView):
    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        
        if serializer.is_valid():
            User = serializer.save()
            token, created = Token.objects.get_or_create(User=User)
            
            # Puedes devolver datos del usuario sin la contraseña
            User_data = {
                "id": User.id,
                "Username": User.Username,
                "email": User.email,
                "first_name": User.first_name,
                "last_name": User.last_name,
            }
            return Response({
                "Token": token.key,
                "User": User_data,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(APIView):
    def post(self, request):
        User = get_object_or_404(User, Username=request.data["Username"])
    
        if not User.check_password(request.data["password"]):
         return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        
        token, create = Token.objects.get_or_create(User=User)
        serializer = LoginSerializer(User)
        return Response({"token": token.key, "User": serializer.data}, status=status.HTTP_200_OK)
    
class LogoutViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.User.auth_token.delete()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
