from app_vibe.serializer import  UserSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication



@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profileView(request):
    # devover info del usuario solo cuando esta logueado
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK) 