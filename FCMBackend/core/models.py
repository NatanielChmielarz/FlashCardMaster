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
    
class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_friend_requests')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_friend_requests')
    accepted = models.BooleanField(default=False)
    sent_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('from_user', 'to_user')  # Prevent duplicate friend requests.

    def __str__(self):
        status = "Accepted" if self.accepted else "Pending"
        return f"{self.from_user.username} -> {self.to_user.username} ({status})"


class Friendship(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendships')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends_with')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user1', 'user2')  # Prevent duplicate friendships.

    def __str__(self):
        return f"{self.user1.username} is friends with {self.user2.username}"

        
class SharedNote(models.Model):
    note = models.ForeignKey(Notes, on_delete=models.CASCADE, related_name='shared_instances')
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_notes')
    shared_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='my_shared_notes')
    shared_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('note', 'shared_with')  # Prevent sharing the same note multiple times.

    def __str__(self):
        return f"{self.shared_by.username} shared '{self.note.title}' with {self.shared_with.username}"
