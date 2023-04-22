from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    roll_number = models.CharField(max_length=10)
    mobile_number = models.CharField(max_length=10)