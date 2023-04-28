from django.urls import path
from .apis import (
    question_api,
    question_create_api,
    start_question,
    stop_question,
    extend_duration_question,
    delete_choice,
    vote,
)

from .views import (
    lobby,
    login,
    submit_poll,
    profile_update,
    
    questions,
    create_question,
    question_manager,
    poll_result
)
from django.views.generic import TemplateView

api_url_patterns = [
    # path("questions/", questions_api, name="questions_api"),
    path("question/<int:poll_id>/", question_api, name="question_api"),
    path("question/create/", question_create_api, name="question_create_api"),
    path("question/start/<int:poll_id>/", start_question, name="start_question"),
    path("question/stop/<int:poll_id>/", stop_question, name="stop_question"),
    path("question/snooze/<int:poll_id>/", extend_duration_question, name="extend_duration"),
    path("choice/delete/<int:poll_choice_id>/", delete_choice, name="delete_choice"),
    
    path("vote/<int:poll_choice_id>/", vote, name="vote"),
]

template_url_patterns = [
    
    # lobby
    path("", lobby, name='lobby'),
    
    # Login
    path("login/", login, name='login'),
    
    # User Views
    # 1. submit vote    /u/
    path("u/", profile_update, name="profile_update"),
    # 2. Profile Update /u/vote/<int:poll:id>/
    path("u/vote/<int:poll_id>", submit_poll, name="submit_poll"),
    
    # Admin Views
    # Questions /polls/
    path("polls/", questions, name="questions"),
    # Create Question /poll/create/
    path("poll/create/", create_question,name="create_question"),
    # Manage Question /poll/manage/<int:poll_id>/
    path("question/manage/<int:poll_id>/", question_manager, name="question_manager"),
    # Poll Results /poll/result/<int:poll_id>/
    path("poll/result/<int:poll_id>/", poll_result,name="poll_result"),

]

urlpatterns = template_url_patterns + api_url_patterns
