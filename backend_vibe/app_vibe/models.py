from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=150, unique=True)
    website = models.URLField(blank=True)

class Publicacion(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Comentario(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)

class Seguidor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seguidores')
    seguido = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seguidos')