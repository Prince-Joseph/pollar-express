from django.urls import path
from .views import questions_api,question_api,start_question,stop_question,question_create_api,vote, extend_duration_question, submit_poll
from django.views.generic import TemplateView
urlpatterns = [
    
    path("", TemplateView.as_view(template_name="index.html")),
    path("poll/<int:poll_id>/", submit_poll, name='poll'),
    
    path("questions/",questions_api, name="questions_api"),
    path("question/<int:poll_id>/",question_api, name="question_api"),

    path("question/create/", question_create_api, name="question_create_api"),
    path("question/start/<int:poll_id>/", start_question, name="start_question"),
    path("question/stop/<int:poll_id>/", stop_question, name="stop_question"),
    path("question/snooze/<int:poll_id>/", extend_duration_question, name="extend_duration"),

    path("vote/<int:poll_choice_id>/", vote, name="vote"),

]
