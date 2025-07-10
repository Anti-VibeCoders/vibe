from rest_framework import serializers
from .models import (
    User, AvatarUser, BackgroundUser, Post, Comment, Follows, 
    FilesPost, Message, FilesMessage, Notification, Share
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "bio", "email", "website", "location"]


class AvatarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvatarUser
        fields = ["file_path", "file_type", "file_size", "upload_date"]


class BackgroundImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BackgroundUser
        fields = ["file_path", "file_type", "file_size", "upload_date"]


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
    """Proccess.........."""
    token = serializers.CharField()





class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "content", "like", "user", "post", "created_at"]
        read_only_fields = ["id", "user", "created_at"]


class FollowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follows
        fields = ["id", "user", "seguido"]


class FilesPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilesPost
        fields = ["id", "file_path", "file_type", "file_size", "upload_date", "user", "post"]
        read_only_fields = ["upload_date"]
        extra_kwargs = {'temp_file': {'write_only': True}}

class PostSerializer(serializers.ModelSerializer):
    files = FilesPostSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ["id", "content", "like", "user", "created_at"]
        read_only_fields = ["id", "user", "created_at"]



class FilesMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilesMessage
        fields = ["id", "file_path", "file_type", "file_size", "upload_date", "user", "message"]
        read_only_fields = ["upload_date"]
        extra_kwargs = {'temp_file': {'write_only': True}}

class MessageSerializer(serializers.ModelSerializer):
    files = FilesMessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Message
        fields = ["id", "body", "sender", "receiver", "create_at", "status", "read_status", "upload_menssage"]
        read_only_fields = ["create_at", "upload_menssage"]

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ["id", "body", "type", "post", "message", "user", "read_status", "created_at"]
        read_only_fields = ["created_at"]

class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ["id", "user", "post", "share_date"]