from django.db import models
import random
# Create your models here.
class Poll(models.Model):
    question = models.CharField(max_length=256)
    time  = models.DurationField()
    is_anonymous = models.BooleanField(default= False)
    is_active = models.BooleanField(default= False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

class PollChoice(models.Model):
    question = models.ForeignKey(Poll, on_delete=models.CASCADE)
    value = models.CharField(max_length=256)

    @property
    def count(self):
        return random.randint(0,100)
    
    def __str__(self) -> str:
        return f"{self.value} ({self.question})"


"""
class Vote(models.Model):
    user =
    poll_choice =
    voted_at =

"""