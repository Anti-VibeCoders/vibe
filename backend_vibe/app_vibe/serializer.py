from rest_framework import serializers
from .models import  User

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
