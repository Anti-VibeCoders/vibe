from rest_framework import serializers
from .models import (
    User, AvatarUser, BackgroundUser, Post, Comment, Follows,
    FilesPost, Message, FilesMessage, Notification, Share
)


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    background = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "bio",
            "email",
            "website",
            "location",
            "avatar",
            "background"
        ]

    def get_avatar(self, obj):
        # Obtenemos el avatar más reciente del usuario
        avatar = AvatarUser.objects.filter(user=obj).order_by('-upload_date').first()
        if avatar:
            return AvatarImageSerializer(avatar).data
        return None
    
    def get_background(self, obj):
        # Obtenemos el background más reciente del usuario
        background = BackgroundUser.objects.filter(user=obj).order_by('-upload_date').first()
        if background:
            return BackgroundImageSerializer(background).data
        return None



class AvatarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvatarUser
        fields = [
            "file_path",
            "file_type",
            "file_size",
            "upload_date"
        ]


class BackgroundImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BackgroundUser
        fields = ["file_path", "file_type", "file_size", "upload_date"]


class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "email",
            "first_name",
            "last_name"
        ]

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
        fields = [
            "id",
            "content",
            "like",
            "user",
            "post",
            "created_at"
        ]
        read_only_fields = ["id", "user", "created_at"]


class FollowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follows
        fields = ["id", "user", "seguido"]


class FilesPostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = FilesPost
        fields = [
            "id",
            "file_path",
            "file_type",
            "file_size",
            "upload_date",
            "user",
            "post"
        ]
        read_only_fields = ["upload_date"]


class PostSerializer(serializers.ModelSerializer):
    files = FilesPostSerializer(
        many=True,
        read_only=True,
        source='filespost_set'
    )
    user = serializers.StringRelatedField()

    class Meta:
        model = Post
        fields = [
            "id",
            "content",
            "like",
            "user",
            "created_at",
            "files",
        ]


class FilesMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilesMessage
        fields = [
            "id",
            "file_path",
            "file_type",
            "file_size",
            "upload_date",
            "user",
            "message",
        ]
        read_only_fields = ["upload_date"]


class MessageSerializer(serializers.ModelSerializer):
    files = FilesMessageSerializer(
        many=True,
        read_only=True,
        source='filesmessage_set'
    )

    class Meta:
        model = Message
        fields = [
            "id",
            "body",
            "sender",
            "receiver",
            "created_at",
            "status",
            "read_status",
            "upload_message",
            "files"
        ]
        read_only_fields = ["sender", "created_at", "upload_message"]


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            "id",
            "body",
            "type",
            "post",
            "message",
            "user",
            "read_status",
            "created_at"
            ]
        read_only_fields = ["created_at"]


class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ["id", "user", "post", "share_date"]
