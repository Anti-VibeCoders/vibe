from app_vibe.serializer import ArchivoSerializer, PublicacionSerializer, ComentarioSerializer
from app_vibe.models import Comentario, Publicacion
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response



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