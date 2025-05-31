from .serializer import RegistroSerializer, LoginSerializer, UserSerializer, ArchivoSerializer, PublicacionSerializer, ComentarioSerializer, SeguidorSerializer
from .models import Publicacion, Comentario, Seguidor, User
# from rest_framework import viewsets
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

# Create your views here.
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class PublicacionViewSet(viewsets.ModelViewSet):
#     queryset = Publicacion.objects.all()
#     serializer_class = PublicacionSerializer

# class ComentarioViewSet(viewsets.ModelViewSet):
#     queryset = Comentario.objects.all()
#     serializer_class = ComentarioSerializer

# class SeguidorViewSet(viewsets.ModelViewSet):
#     queryset = Seguidor.objects.all()
#     serializer_class = SeguidorSerializer  



@api_view(["POST"])
def RegistroView(request):
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

@api_view(["POST"])
def LoginView(request):
    user = get_object_or_404(User, username=request.data["username"])
    
    if not user.check_password(request.data["password"]):
        return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
    
    token, create = Token.objects.get_or_create(user=user)
    serializer = LoginSerializer(user)
    
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profileView(request):
    # devover info del usuario solo cuando esta logueado
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK) 

@api_view(["POST"])
def LogoutView(request):
    """EN PROCESO ......"""
    # serializer = UserSerializer(request.user)
    pass


class SubirArchivoApiView(APIView):
    def post(self, request, format=None):
        # Agarramos el archivo enviado
        serializer = ArchivoSerializer(data = request.data)
        # Verificamos q sea valido
        if serializer.is_valid():
            # Guardamos
            archivo_obj = serializer.save()
            # Verificamos q hay archivos
            if archivo_obj.archivo:
                # Conceguimos una url para mostrar posteriormente el archivos
                archivo_url = request.build_absolute_uri(archivo_obj.archivo.url)
            else:
                # En caso de no archivos
                archivo_url = None
            
            # En caso de q todo este bien enviamos un mesaje y la url del archivo
            return Response({"mensaje": "Archivo subido correctamente",
                             "archivo_url": archivo_url}, status=status.HTTP_201_CREATED)
            
        # En caso de q no soltamos un error a comerse al usuario
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# ejemplo para probra la subida de archivoz
def mi_vista(request):
    return render(request, 'index.html')


@api_view(["GET"])
def PublicacionView(request):
    queryset = Publicacion.objects.all()
    serializer = PublicacionSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def PublicacionCreateView(request):
    serializer = PublicacionSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def CommentarioView(request):
    queryset = Comentario.objects.all()
    serializer = ComentarioSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CommentarioCreateView(request):
    serializer = ComentarioSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)