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

class Tabs(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tabs')
    notes = models.ManyToManyField(Notes, related_name='tabs') 

class Events(models.Model):
    title = models.CharField(max_length=80)
    date = models.DateField()
    is_active = models.BooleanField(default=True,blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_events')
    

# class Friendship(models.Model):
#     from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendship_sent')
#     to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendship_received')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.from_user.username} is friends with {self.to_user.username}"

#     class Meta:
#         unique_together = ('from_user', 'to_user')
        
# class SharedNote(models.Model):
#     note = models.ForeignKey(Notes, on_delete=models.CASCADE, related_name='shared_notes')
#     shared_with = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_with_me')
#     shared_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_by_me')
#     shared_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.shared_by.username} shared '{self.note.title}' with {self.shared_with.username}"
