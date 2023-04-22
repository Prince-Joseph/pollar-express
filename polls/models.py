from django.db import models
from django.utils import timezone

from users.models import CustomUser
class Poll(models.Model):
    question = models.CharField(max_length=256)
    duration  = models.DurationField()
    is_anonymous = models.BooleanField(default= False)
    is_active = models.BooleanField(default= False)
    created_at = models.DateTimeField(auto_now_add=True)
    expire_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.question
    
    def check_expire(self):
        if self.expire_at:
            if timezone.now() > self.expire_at:
                self.is_active = False
                self.expire_at = None
                self.save()
                
    @property
    def count(self):
        poll_choices = self.pollchoice_set.all()
        count_ = 0
        for poll_choice in poll_choices:
            count_ = poll_choice.count + count_
        return count_

class PollChoice(models.Model):
    question = models.ForeignKey(Poll, on_delete=models.CASCADE)
    value = models.CharField(max_length=256)

    @property
    def count(self):
        len_ = self.vote_set.all().count()
        return len_
    
    def __str__(self) -> str:
        return f"{self.value} ({self.question})"


class Vote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    poll_choice = models.ForeignKey(PollChoice, on_delete=models.CASCADE)
    voted_at = models.DateTimeField(auto_now_add=True)

    def did_vote(user, poll_id):
        poll_choices = Poll.objects.get(id=poll_id).pollchoice_set.all()
        try:
            votes = Vote.objects.get(id__in=poll_choices.values_list('id'), user=user)
        except Vote.DoesNotExist:
            return False
        else:
            return True