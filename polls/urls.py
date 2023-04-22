from django.urls import path
from .views import questions_api,question_api,start_question,stop_question,question_create_api
urlpatterns = [
    path("questions/",questions_api, name="questions_api"),
    path("question/<int:poll_id>/",question_api, name="question_api"),

    path("question/create/", question_create_api, name="question_create_api"),
    path("question/start/<int:poll_id>/",start_question, name="start_question"),
    path("question/stop/<int:poll_id>/",stop_question, name="stop_question"),
    # path("vote/<int:poll_choice_id>/", ,name=""),
    

    
]
