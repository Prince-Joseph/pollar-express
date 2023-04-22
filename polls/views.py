from django.shortcuts import render, redirect
from .models import Poll, PollChoice, Vote
from django.http import JsonResponse
from django.utils import timezone


def submit_poll(request, poll_id):
    return render(request,"submit_poll.html")



def questions_api(request):
    questions = Poll.objects.all().values("id", "question" , "is_active", "expire_at")
    data = {
        "questions" : list(questions)
    }
    return JsonResponse(data=data)


def question_api(request, poll_id):
    poll = Poll.objects.get(id = poll_id)
    poll.check_expire()

    choices = PollChoice.objects.filter(question__id = poll_id)
    choices_dict = list(choices.values("value","id"))

    for index, choice in enumerate(choices):
        choices_dict[index]["count"] = choice.count

    data = {
        "question" : poll.question,
        "duration" : poll.duration,
        "isActive" : poll.is_active,
        "choices" : list(choices_dict),
        "expireAt" : timezone.localtime(poll.expire_at),
        "count" : poll.count,
    }

    return JsonResponse(data = data)

def start_question(request, poll_id):
    poll = Poll.objects.get(id = poll_id)

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
    return JsonResponse(data= data)

def stop_question(request, poll_id):
    poll = Poll.objects.get(id = poll_id)
    poll.is_active = False
    poll.save()

    data = {
        "questionId": poll_id,
        "question": poll.question,
        "isActive": poll.is_active,
    }
    return JsonResponse(data= data)

def extend_duration_question(request, poll_id):
    poll = Poll.objects.get(id = poll_id)
    poll.is_active = True
    poll.expire_at = poll.expire_at + timezone.timedelta(seconds=10) 
    poll.save()

    data = {
        "questionId": poll_id,
        "question": poll.question,
        "isActive": poll.is_active,
    }
    return JsonResponse(data= data)


def question_create_api(request):

    if request.method == "POST":
        data = request.POST

        """
        data = {
          "question" : poll.question,
          "is_anonymous" : "yes"
          "choices": [
            {"name":"d"},
            {"name":"d"},
            {"name":"d"},
            ],
          "duration": ""
        }
        """

        poll = Poll()
        poll.question = data["question"]
        poll.is_anonymous = data["isAnonynous"]
        poll.duration = data["duration"]
        poll.save()

        data={
            "data" : "prince",
        }
        return JsonResponse(data)


def vote(request, poll_choice_id):
    poll_choice = PollChoice.objects.get(id = poll_choice_id)
    if not Vote.did_vote(request.user,poll_choice.question.id):
        vote = Vote()
        vote.user = request.user
        vote.poll_choice = poll_choice
        vote.save()
        return JsonResponse({"vote": vote.poll_choice.value})
    else:
        return JsonResponse({"vote": "voted"})
    


