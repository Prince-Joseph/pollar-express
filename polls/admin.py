from django.contrib import admin
from .models import Poll, PollChoice, Vote
# Register your models here.
admin.site.register(Poll)
admin.site.register(PollChoice)
admin.site.register(Vote)