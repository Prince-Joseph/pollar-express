from django.http import JsonResponse

from .models import Poll, PollChoice, Vote
from django.utils import timezone

from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required


""" ADMIN API """

@login_required
@staff_member_required
def question_api(request, poll_id):
    """
    Returns Information of single question based on PollID
    "question/<int:poll_id>/"
    """

    poll = Poll.objects.get(id=poll_id)
    poll.check_expire()

    choices = PollChoice.objects.filter(question__id=poll_id)
    choices_dict = list(choices.values("value", "id"))

    for index, choice in enumerate(choices):
        choices_dict[index]["count"] = choice.count

    data = {
        "question": poll.question,
        "duration": poll.duration,
        "isActive": poll.is_active,
        "choices": list(choices_dict),
        "expireAt": timezone.localtime(poll.expire_at)
        if poll.expire_at
        else "not active",
        "voters": poll.voters,
        "latest_voters": poll.latest_voters,
        "count": poll.count,
        "timeLeft": poll.time_left,
    }

    return JsonResponse(data=data)

@login_required
@staff_member_required
def question_create_api(request):
    """
    Api to Create Questions based on POST
    "question/create/"

    """

    if request.method == "POST":
        data = request.POST

        poll = Poll()
        poll.question = data["question"]
        poll.is_anonymous = data["isAnonynous"]
        poll.duration = data["duration"]
        poll.save()

        data = {
            "data": "prince",
        }
        return JsonResponse(data)

@login_required
@staff_member_required
def start_question(request, poll_id):
    """
    API to (start) make the poll_id active
    "question/start/<int:poll_id>/"

    """
    poll = Poll.objects.get(id=poll_id)

    if poll.is_active == False:
        poll.expire_at = poll.duration + timezone.now()
        poll.is_active = True
        poll.save()

    data = {
        "questionId": poll_id,
        "question": poll.question,
        "isActive": poll.is_active,
        "expireAt": poll.expire_at,
    }
    return JsonResponse(data=data)

@login_required
@staff_member_required
def stop_question(request, poll_id):
    """
    API to (stop) make the poll_id inactive
    "question/stop/<int:poll_id>/"

    """
    
    poll = Poll.objects.get(id = poll_id)
    poll.is_active = False
    poll.expire_at = None
    poll.save()

    data = {
        "questionId": poll_id,
        "question": poll.question,
        "isActive": poll.is_active,
    }
    return JsonResponse(data= data)

@login_required
@staff_member_required
def extend_duration_question(request, poll_id):
    """
    API to  increase the timer duration
    "question/snooze/<int:poll_id>/"

    """
    poll = Poll.objects.get(id = poll_id)
    if poll.is_active:    
        poll.expire_at = poll.expire_at + timezone.timedelta(seconds=10) 
        poll.save()

    data = {
        "questionId": poll_id,
        "question": poll.question,
        "isActive": poll.is_active,
    }
    return JsonResponse(data= data)


"""
User API
"""
@login_required
def vote(request, poll_choice_id):
    """"
    An API to enable user to vote
    "vote/<int:poll_choice_id>/"
    
    - Lets User vote only once
    """
    poll_choice = PollChoice.objects.get(id = poll_choice_id)
    
    if not Vote.did_vote(request.user, poll_choice.question.id):
        vote = Vote()
        vote.user = request.user
        vote.poll_choice = poll_choice
        vote.save()
   
    data = {
            "voteStatus": Vote.did_vote(request.user,poll_choice.question.id),
            }
    return JsonResponse(data = data)