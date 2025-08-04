from app_vibe.serializer import RegistroSerializer
from app_vibe.models import User
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()


class RegistroViewSet(APIView):
    def post(self, request):
        serializer = RegistroSerializer(data=request.data)

        if serializer.is_valid():
            # 1. Crear usuario en Supabase Auth
            supabase = create_client(
                os.getenv("SUPABASE_URL"),
                os.getenv("SUPABASE_KEY")
            )

            try:
                # Registrar usuario en Supabase Auth
                auth_response = supabase.auth.sign_up({
                    "email": request.data["email"],
                    "password": request.data["password"]
                })

                # 2. Crear usuario en Django con el auth_id
                user = serializer.save(auth_id=auth_response.user.id)

                # 3. Generar token Django
                token, created = Token.objects.get_or_create(user=user)

                user_data = {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "auth_id": user.auth_id
                }

                return Response({
                    "token": token.key,
                    "user": user_data,
                    "supabase_user": auth_response.user
                }, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class LoginViewSet(APIView):
    def post(self, request):
        # 1. Verificar en Django
        user = get_object_or_404(User, email=request.data["email"])

        if not user.check_password(request.data["password"]):
            return Response(
                {"error": "Invalid password"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 2. Verificar en Supabase Auth
        supabase = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_KEY")
            )

        try:
            auth_response = supabase.auth.sign_in_with_password({
                "email": user.email,
                "password": request.data["password"]
            })
        except Exception as e:
            return Response(
                {"error": "Supabase auth failed", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 3. Generar token Django
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "auth_id": user.auth_id,
                "username": user.username,
                "email": user.email
            },
            "supabase_session": auth_response.session.access_token
        }, status=status.HTTP_200_OK)


class LogoutViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(
            {"message": "Logged out successfully"},
            status=status.HTTP_200_OK
        )
