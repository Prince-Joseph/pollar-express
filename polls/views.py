from django.shortcuts import render, redirect

from django.utils import timezone
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required

from .models import Poll, PollChoice, Vote

from .forms import QuestionCreateForm, ChoiceCreateForm
from .form_validations import profile_form__validate_and_save

from .queryset_modifiers import sort_qs, filter_qs


"""
User VIEWS
"""

@login_required
def lobby(request):
    """
    Shows active questions
    """
    context={}
    active_questions = Poll.objects.filter(is_active = True, expire_at__gt= timezone.now())
    context['active_questions'] = active_questions

    return render(request , "lobby.html", context=context)


def login(request):
    return render(request , "login.html")

@login_required
def submit_poll(request, poll_id):
    """
    submits the active polls

    1. poll (active|inactive) -> (stay|lobby)
    2. user (vote|did not vote) -> (lobby| stay)
    3. request (get|post) -> ()
    4. if post -> choice (integer|none)


    stay: return render(request,"submit_poll.html", context)
    lobby: return redirect('lobby')

    if not poll.is_active
        True:  lobby
    if Vote.did_vote(request.user, poll_id)
        True:  lobby
    if request.method == "GET":
        True:  Stay
    else:
        if request.method == "POST":
            if request.POST.get('choice_id') is not None:
                form save
                True: lobby
            else:
                stay

    """

    context={}
    poll = Poll.objects.get(id=poll_id)
    context['poll'] = poll

    if not poll.is_active:
        messages.add_message(request, messages.INFO, "The poll is no longer active.")
        return redirect('lobby')

    if Vote.did_vote(request.user, poll_id):
        messages.add_message(request, messages.INFO, "you already voted bro,Voting once is more than enough.")
        return redirect('lobby')

    if request.method == "GET":
        return render(request,"submit_poll.html", context)
    else:
        if request.method == "POST":
            choice_id = request.POST.get('choice_id')
            if choice_id is not None:
                vote = Vote()
                poll_choice = PollChoice.objects.get(id=choice_id)
                vote.user = request.user
                vote.poll_choice = poll_choice
                vote.save()
                messages.add_message(request, messages.INFO, "Congrats!🎊!,You have voted.Finished something for once")
                return redirect('lobby')
            else:
                print("selct")
                messages.add_message(request, messages.INFO, "select an option pleeeeaaassee")
                return render(request,"submit_poll.html", context)
        else:
            messages.add_message(request, messages.INFO, "Illegal activities are prohibited ")
            return redirect('lobby')

@login_required
def profile_update(request):
    """
    Updates Profile
    """

    if request.method == "POST":
        profile_form__validate_and_save(request)

    return render(request,"profile_update.html" )


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

    questions = Poll.objects.all()
    for question in questions:
        question.check_expire()
    questions = sort_qs(questions, request.GET, { 'date_property': 'created_at' })
    questions = filter_qs(questions, request.GET)
    context['questions'] = questions
    return render(request, "questions.html", context=context)


@login_required
@staff_member_required
def create_question(request):
    """
    Creates Results
    /poll/create/ => /poll/create/?pollId=<int:poll_id>
    we get pollId from url of question manager (?pollId=<int:poll_id>)
    """

    poll_id = request.GET.get("pollid")
    print(poll_id)
    context = {}

    if poll_id is not None:

        poll= Poll.objects.get(id=poll_id)
        question_form = QuestionCreateForm(instance=poll)
        context['poll'] = poll

    else:
        question_form = QuestionCreateForm()


    choice_form = ChoiceCreateForm()

    context['question_form'] = question_form
    context['choice_form'] = choice_form

    if request.method == "POST":
        if request.POST.get("form_type") =="question":
            if poll_id is None:
                form = QuestionCreateForm(request.POST)
                if form.is_valid():
                        poll = form.save()
                response = redirect('create_question')
                response['Location'] += f'?pollid={poll.id}'
                return response

            else:
                form = QuestionCreateForm(request.POST, instance=poll)
                if form.is_valid():
                        poll = form.save()

                response = redirect('create_question')
                response['Location'] += f'?pollid={poll.id}'
                return response
        else:
            form = ChoiceCreateForm(request.POST)
            if form.is_valid():
                choice = form.save()
                response = redirect('create_question')
                response['Location'] += f'?pollid={choice.question.id}'
                return response




    return render(request,"create_question.html", context)

# @login_required
# @staff_member_required
# def update_question(request,poll_id):

#     poll_id = request.GET.get(poll_id)
#     Pollpoll = .objects.get(id=poll_id)

#     context={}
#     context["poll"]=poll

#     return render(request,"create_question.html", context)



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

