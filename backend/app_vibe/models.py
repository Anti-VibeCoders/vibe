from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)


class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    location = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    website = models.URLField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    auth_id = models.CharField(max_length=100, blank=True)


class AvatarUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_path = models.URLField(blank=True)
    file_type = models.CharField(max_length=50)
    file_size = models.BigIntegerField()
    upload_date = models.DateTimeField(auto_now_add=True)


class BannerUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_path = models.URLField(blank=True)
    file_type = models.CharField(max_length=50)
    file_size = models.BigIntegerField()
    upload_date = models.DateTimeField(auto_now_add=True)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    like = models.IntegerField(default=0)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    like = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


class Follows(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='siguiendo'
    )
    seguido = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='seguidores'
    )


class FilesPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file_path = models.URLField(blank=True)
    file_type = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )
    file_size = models.BigIntegerField(blank=True, null=True)
    upload_date = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    STATUS_CHOICES = [
        ("sent", "Sent"),
        ("delivered", "Delivered"),
        ("read", "Read"),
    ]

    body = models.TextField()
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='mensajes_enviados'
        )
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='mensajes_recibidos'
        )
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="sent"
        )
    read_status = models.BooleanField(default=False)
    upload_message = models.DateTimeField(auto_now_add=True)


class FilesMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    file_path = models.URLField(blank=True)
    file_type = models.CharField(max_length=50, blank=True, null=True)
    file_size = models.BigIntegerField(blank=True, null=True)
    upload_date = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    message = models.ForeignKey(
        Message,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    body = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    read_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Share(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    share_date = models.DateTimeField()

    def str(self):
        return f"""
        {self.user.username} shared Post {self.post.id} on {self.share_date}
        """