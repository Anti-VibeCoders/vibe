from rest_framework import serializers
from .models import  User, Archivo, Publicacion, Comentario, Seguidor

class UserSerializer(serializers.ModelSerializer):
    # Especificamos las filas q queremos mostrar
    class Meta:
        model = User
        fields =  ["username", "first_name","last_name", "bio", "email", "profile_image"]

class UserProfileSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(source='profile.bio', read_only=True)
    profile_image = serializers.ImageField(source='profile.profile_image', read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'profile_image']

class RegistroSerializer(serializers.ModelSerializer):
    # Hacemos que el password solo sea escrubir y no se muestre
    password = serializers.CharField(write_only=True)
    
    # Especificamos las filas q queremos mostrar
    class Meta:
        model = User
        fields = ["username", "password", "email", "first_name", "last_name"]

    # Validamos todos los datos optenidos
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
    """EN PROCESO....."""
    token = serializers.CharField()

class ArchivoSerializer(serializers.ModelSerializer):

    # Especificamos las filas q queremos mostrar
    class Meta:
        model = Archivo
        fields = ["archivo"]
    
    def create(self, validated_data):
        # Guardar en el modelo Archivo
        return Archivo.objects.create(**validated_data)

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