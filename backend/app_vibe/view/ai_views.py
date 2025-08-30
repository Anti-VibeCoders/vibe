from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from dotenv import load_dotenv
import os
import google.generativeai as genai
from google.generativeai import types

load_dotenv()


class GeminiEndPoint(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # ? Obtenemos el prompt del request
            prompt = request.data.get('prompt')
            if not prompt:
                return Response(
                    {"error": "Prompt is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Obténemos la API key desde variables de entorno
            api_key = os.getenv("GEMINI_KEY")
            if not api_key:
                return Response(
                    {"Error": "API key not configured"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # Inicializamos el cliente de GenAI
            genai.configure(api_key=api_key)

            model = genai.GenerativeModel('gemini-1.5-flash')

            # Llama al modelo para generar contenido
            response = model.generate_content(
                prompt,
                generation_config=types.GenerationConfig(
                    max_output_tokens=500,
                    temperature=0.1
                )
            )

            # Devuelve la respuesta en formato JSON
            return Response(response.text, status=status.HTTP_200_OK)

        except Exception as e:
            # Manejo de errores inesperados
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
