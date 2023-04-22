from django.shortcuts import render, redirect
from .models import Poll, PollChoice
from django.http import JsonResponse


def questions_api(request):
    questions = Poll.objects.all().values_list("question")
    data = {
        "questions" : list(questions)
    }
    return JsonResponse(data=data)


def question_api(request, poll_id):
    poll = Poll.objects.get(id = poll_id)
    choices = PollChoice.objects.filter(question__id = poll_id)
    choices_dict = list(choices.values("value","id"))

    for index, choice in enumerate(choices):
        choices_dict[index]["count"] = choice.count

    data = {
        "question" : poll.question,
        "time" : poll.time,
        "choices" : list(choices_dict)
    }

    return JsonResponse(data = data)


