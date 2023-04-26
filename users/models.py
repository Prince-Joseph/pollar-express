from django.db import models
import re

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    roll_number = models.CharField(max_length=10)
    mobile_number = models.CharField(max_length=10)

    def first_name__is_valid(first_name) -> bool:
        is_valid = True
        message = ""
        # None
        if first_name is None:
            is_valid = False
            message = "Must not be empty, Type your Name"
        if first_name == '':
            is_valid = False
            message = "Must not be empty, Type your Name"
        if len(first_name) >= 150:
            is_valid = False
            message = "Length exceedes maximum limit, write a short Name "

        return {'is_valid': is_valid, 'message' : message }

    def roll_number__is_valid(roll_number) -> bool:
        is_valid =True
        message = ""
        if roll_number is None:
            is_valid = False
            message = "Must not be empty, Type your Roll Number"
        if roll_number == '':
            is_valid = False
            message = "Must not be empty, Type your Roll Number"
        if len(roll_number) != 10:
            is_valid = False
            message = "Length must be 10, Type your proper Roll Number"
        if  re.search("\d{2}K8[15]A", roll_number) is None:
            is_valid=False
            message = "Fill correct Roll number "
        return  {'is_valid': is_valid, 'message' : message }

    def mobile_number__is_valid(mobile_number) -> bool:
        is_valid = True
        if mobile_number is None:
            is_valid = False
        if mobile_number == '':
            is_valid = False
        if len(mobile_number) != 10:
            is_valid = False
        message = "Length must be 10, Type your proper Mobile Number"
        return {'is_valid': is_valid, 'message' : message }

