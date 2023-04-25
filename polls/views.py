from django.shortcuts import render, redirect
from .models import Poll, PollChoice, Vote
from .forms import QuestionCreateForm, ChoiceCreateForm

from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
"""
User VIEWS
"""

@login_required
def lobby(request):
    """
    Shows active questions
    """
    context={}
    context['active_questions']= Poll.objects.filter(is_active = True)
    return render(request , "lobby.html", context=context)

def login(request):
    return render(request , "login.html")

@login_required
def submit_poll(request, poll_id):
    """
    submits the active polls
    """
    return render(request,"submit_poll.html")

@login_required
def profile_update(request):
    """
    Updates Profile
    """
    return render(request,"profile_update.html")


"""
Admin VIEWS
"""
@login_required
@staff_member_required
def questions(request):
    """
    Display Results
    """
    context = {}
    context['questions'] = Poll.objects.all()
    return render(request, "questions.html", context=context)


@login_required
@staff_member_required
def create_question(request):
    """
    Creates Results
    /poll/create/ => /poll/create/?pollId=<int:poll_id>
    we get pollId from url of question manager (?pollId=<int:poll_id>)
    """
    
    poll_id = request.GET.get("pollId")
    
    question_form = QuestionCreateForm()
    choice_form = ChoiceCreateForm()

    context = {}
    context['question_form'] = question_form
    context['choice_form'] = choice_form

    if request.method == "POST":
        if request.POST.get("form_type") =="question":
            form = QuestionCreateForm(request.POST)
        else:
            form = ChoiceCreateForm(request.POST)

        if form.is_valid():
            form.save()

    return render(request,"create_question.html", context)


@login_required
@staff_member_required
def question_manager(request, poll_id):
    """
    Question Manager
    """
    question = Poll.objects.get(id = poll_id)
    context= {}
    context["poll"] = question
    return render(request,"question_manager.html", context= context)

@login_required
@staff_member_required
def poll_result(request, poll_id):
    """
    Display Results
    """
    poll = Poll.objects.get(id=poll_id)
    context = {}
    context['poll'] = poll
    return render(request, "poll_result.html", context)

