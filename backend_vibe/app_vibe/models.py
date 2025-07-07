from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    location = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    website = models.URLField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)


class AvatarUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_path = models.FileField(upload_to='avatar/')
    file_type = models.CharField(max_length=50)
    file_size = models.BigIntegerField()
    upload_date = models.DateTimeField(auto_now_add=True)


class BackgroundUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_path = models.FileField(upload_to='backgrounds/')
    file_type = models.CharField(max_length=50)
    file_size = models.BigIntegerField()
    upload_date = models.DateTimeField(auto_now_add=True)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='siguiendo')
    seguido = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seguidores')


class FilesPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file_path = models.FileField(upload_to='post_files/')
    file_type = models.CharField(max_length=50)
    file_size = models.BigIntegerField()
    upload_date = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    body = models.TextField()
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mensajes_enviados')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mensajes_recibidos')
    create_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    read_status = models.BooleanField(default=False)
    upload_menssage = models.DateTimeField(auto_now_add=True)


class FilesMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    file_path = models.FileField(upload_to='message_files/')
    file_type = models.CharField(max_length=50)
    file_size = models.BigIntegerField()
    upload_date = models.DateTimeField(auto_now_add=True)


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True, blank=True)
    message = models.ForeignKey(Message, on_delete=models.SET_NULL, null=True, blank=True)
    body = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    read_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
