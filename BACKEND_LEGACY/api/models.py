from django.db import models

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = None
    password = models.CharField(max_length=64)
    email = models.EmailField(max_length=30, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []