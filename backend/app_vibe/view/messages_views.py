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
from app_vibe.models import Message, FilesMessage, User
from app_vibe.serializer import MessageSerializer
from app_vibe.services.supabase_service import SupabaseStorageService
from django.db import transaction
from django.db.models import Prefetch, Q
from rest_framework.parsers import MultiPartParser, FormParser

import logging

logger = logging.getLogger(__name__)


class MessageView(APIView):
    @permission_classes([IsAuthenticated])
    def get(self, request):
        queryset = Message.objects.filter(
            Q(sender=request.user) | Q(receiver=request.user)
            ).prefetch_related(
                Prefetch(
                   "filesmessage_set",
                   queryset=FilesMessage.objects.select_related("user"),
                   to_attr='archivos'
                )
        ).all()

        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MessageCreateView(APIView):
    @parser_classes([MultiPartParser, FormParser])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        try:
            with transaction.atomic():
                receiver_id = request.data.get("receiver_id")
                body = request.data.get("body")

                if not body:
                    return Response(
                        {"error": "El mensaje no puede estar vacío"},
                        status=400
                    )

                try:
                    receiver = User.objects.get(id=receiver_id)
                except User.DoesNotExist:
                    return Response(
                        {"error": "Usuario receptor no válido"},
                        status=400
                    )

                message = Message.objects.create(
                    body=body,
                    sender=request.user,
                    receiver=receiver,
                    status="sent"
                )

                uploaded_files = []
                storage = SupabaseStorageService()

                for file in request.FILES.getlist("files"):
                    file_url = storage.upload_to_message(
                        file=file,
                        message_id=message.id,
                        user_id=request.user.id
                    )
                    FilesMessage.objects.create(
                        message=message,
                        user=request.user,
                        file_path=file_url,
                        file_type=file.content_type,
                        file_size=file.size
                    )
                    uploaded_files.append(file_url)

                return Response(
                    MessageSerializer(message).data,
                    status=status.HTTP_201_CREATED
                )

        except Exception as e:
            return Response({"error": str(e)}, status=400)
