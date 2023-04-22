from django.urls import path
from .views import questions_api,question_api
urlpatterns = [
    path("questions/",questions_api, name="questions_api"),
    path("question/<int:poll_id>/",question_api, name="question_api"),

    # path("question/create/", , name=""),
    # path("question/start/<int: poll_id>", , name=""),
    # path("question/stop/<int:poll_id>/", , name=""),
    # path("vote/<int:poll_choice_id>/", ,name=""),
    

    
]
