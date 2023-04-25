from django import forms
from .models import Poll,PollChoice

class QuestionCreateForm(forms.ModelForm):
    class Meta:
        model = Poll
        fields = [
            'question',
            'duration',
            'is_anonymous',
            'is_active',
            ]
        
class ChoiceCreateForm(forms.ModelForm):
    class Meta:
        model = PollChoice
        fields = [
            'question',
            'value',
            ]