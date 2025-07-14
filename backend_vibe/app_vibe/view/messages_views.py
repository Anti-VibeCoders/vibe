from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from app_vibe.models import Message, FilesMessage
from app_vibe.serializer import MessageSerializer, FilesMessageSerializer

class MessageView(APIView):
    def get(self, request):
        queryset = Message.objects.prefetch_related('filesmessage_set').all()
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MessageCreateView(APIView):
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])

    def post(self, request):
        message_data = {
            'body': request.data.get('body'),
            'sender': request.user.id,
            'receiver': request.data.get('receiver'),
            'status': 'unread'
        }
        
        files = request.FILES.getlist('files')
        
        message_serializer = MessageSerializer(data=message_data)
        if not message_serializer.is_valid():
            return Response(message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        message = message_serializer.save()

        for file in files:
            file_data = {
                'message': message.id,
                'user': request.user.id,
                'temp_file': file
            }
            file_serializer = FilesMessageSerializer(data=file_data)
            if file_serializer.is_valid():
                file_serializer.save()
            else:
                message.delete()
                return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(message_serializer.data, status=status.HTTP_201_CREATED)
