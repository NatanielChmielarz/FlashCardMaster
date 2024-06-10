from django.db import models
from user_app.models import User
class Notes(models.Model):
    title = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_notes')
    content = models.TextField()

    def __str__(self):
        return self.title
    
class Flashcards(models.Model):
    notes = models.ForeignKey(Notes, on_delete=models.CASCADE, related_name='flashcards')
    title = models.CharField(max_length=200)
    emoji = models.CharField(max_length=50, blank=True)
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)

class Events(models.Model):
    title = models.CharField(max_length=80)
    date = models.DateField()
    is_active = models.BooleanField(default=True,blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_events')
    
