from rest_framework import serializers
from .models import  User, Publicacion, Comentario, Seguidor

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ["id", "username", "password", "email"]

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ["username", "password", "email", "first_name", "last_name"]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class LogoutSerializer(serializers.Serializer):
    token = serializers.CharField()

class PublicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicacion
        fields = ["id", "user", "contenido", "fecha_creacion"]
        read_only_fields = ["id", "user", "fecha_creacion"]

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model: Comentario
        fields = ["id", "publicacion", "user", "contenido", "fecha_creacion"]

class SeguidorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seguidor
        fields = ["id", "user", "seguido"]
