from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from dotenv import load_dotenv
import os
import google.generativeai as genai
from google.generativeai import types

load_dotenv()


class GeminiEndPoint(APIView):
    def get(self, resquest, *args, **kwargs):
        try:
            # Obténemos la API key desde variables de entorno
            api_key = os.getenv("API-KEY")
            if not api_key:
                return Response(
                    {"Error": "API key not configured"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # Inicializamos el cliente de GenAI
            client = genai.Client(api_key=api_key)

            # Llama al modelo para generar contenido
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents="general",
                config=types.GenerateContentConfig(
                    max_output_tokens=500,
                    temperature=0.1
                )
            )

            # Extrae el contenido generado
            result = response.json()

            # Devuelve la respuesta en formato JSON
            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            # Manejo de errores inesperados
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
