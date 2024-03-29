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
                # self.expire_at = None
                self.save()



    @property
    def count(self):
        poll_choices = self.pollchoice_set.all()
        count_ = 0
        for poll_choice in poll_choices:
            count_ = poll_choice.count + count_
        return count_

    @property
    def time_left(self):
        current_time = timezone.now()
        if self.expire_at:
            timer =  self.expire_at - current_time
            minutes, seconds = divmod(timer.total_seconds(), 60)
            return  f"{'{:02d}'.format(int(minutes))}:{'{:02d}'.format(int(seconds))}"
        else:
            return "00:00"

    @property
    def voters(self):
        choices = PollChoice.objects.filter(question__id = self.id)
        choices_list = choices.values_list("id")
        users_list = Vote.objects.filter(poll_choice__in = choices_list).values_list("user")
        users = list(CustomUser.objects.filter(id__in=users_list).values_list("first_name"))
        return users

    @property
    def latest_voters(self):
        choices = PollChoice.objects.filter(question__id = self.id)
        choices_list = choices.values_list("id")
        users_list = Vote.objects.filter(poll_choice__in = choices_list, voted_at__gt = timezone.now()-timezone.timedelta(seconds = 2)).values_list("user")
        users = list(CustomUser.objects.filter(id__in=users_list).values_list("first_name"))
        return users


    def get_new_polls():
       all_polls = Poll.objects.all()
       new_polls = Poll.objects.none()
       
       for poll in all_polls:
        #    print(f"{poll}\n poll.has_votes: {poll.has_votes} \n new_polls: {new_polls}\n")
           poll__as_qs = Poll.objects.filter(id = poll.id)
           if not poll.has_votes:
               new_polls = new_polls | poll__as_qs

       return new_polls
    
    def get_completed_polls():
       all_polls = Poll.objects.all()
       new_polls = Poll.objects.none()
       
       for poll in all_polls:
        #    print(f"{poll}\n poll.has_votes: {poll.has_votes} \n new_polls: {new_polls}\n")
           poll__as_qs = Poll.objects.filter(id = poll.id)
           if poll.has_votes:
               new_polls = new_polls | poll__as_qs

       return new_polls
    
   
    

    @property
    def has_votes(self):
        has_votes = False
        pollchoices = self.pollchoice_set.all() 
        for poll_choice in pollchoices:
            # print(f"{poll_choice}\n poll_choice.has_votes: {poll_choice.has_votes} \n poll.has_votes: {has_votes}\n")
            if poll_choice.has_votes == True:
                has_votes = True
                break
        return has_votes

class PollChoice(models.Model):
    question = models.ForeignKey(Poll, on_delete=models.CASCADE)
    value = models.CharField(max_length=256)

    @property
    def count(self):
        len_ = self.vote_set.all().count()
        return len_

    def __str__(self) -> str:
        return f"{self.value} ({self.question})"

    @property
    def has_votes(self):
        """ 
        has_votes:True -->  (someone answered)
        has_votes:False --> (no one answered)
        """
        has_votes = False
        votes = self.vote_set.all()
        if len(votes) > 0:
            has_votes = True
        # print(f"{self.value}:{has_votes}")
        
        return has_votes


class Vote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    poll_choice = models.ForeignKey(PollChoice, on_delete=models.CASCADE)
    voted_at = models.DateTimeField(auto_now_add=True)

    def did_vote(user, poll_id):
        question = Poll.objects.get(id=poll_id)
        choices = PollChoice.objects.filter(question__id = poll_id)
        choices_list = choices.values_list("id")

        votes = Vote.objects.filter(poll_choice__in = choices_list)

        for vote in votes:
            if user == vote.user:
                return True

        return False
        """
        [1, 2]
        1 - prince
        2 - alekhya
        1 - nams
        """