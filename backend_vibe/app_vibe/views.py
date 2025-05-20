from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class Main(APIView):
    def get(self, request):
        return Response("mesange", "hola desde DJANGO")