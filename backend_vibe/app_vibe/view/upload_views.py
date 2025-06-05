from app_vibe.serializer import ArchivoSerializer
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
