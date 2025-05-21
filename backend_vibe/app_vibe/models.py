from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=50)
    nickname = models.CharField(max_length=75)
    is_active = models.BooleanField(default=True)
    