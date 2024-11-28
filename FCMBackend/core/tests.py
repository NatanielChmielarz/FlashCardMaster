from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Notes, Flashcards, Events,FriendRequest,Friendship,SharedNote
from django.db import IntegrityError
from django.utils import timezone
from rest_framework.test import APIClient
User = get_user_model()

class ModelsTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(email='testuser1@test.pl',username='test1', password='TEST123!')
        self.user2 = User.objects.create_user(email='testuser2@test.pl',username='test2', password='TEST123!')
        
        self.note = Notes.objects.create(
            title='Test Note',
            user=self.user1,
            content='This is a test note'
        )

    def test_notes_creation(self):
        self.assertEqual(self.note.title, 'Test Note')
        self.assertEqual(self.note.user, self.user1)
        self.assertEqual(self.note.content, 'This is a test note')
        self.assertEqual(str(self.note), 'Test Note')

    def test_flashcards_creation(self):
        flashcard = Flashcards.objects.create(
            notes=self.note,
            title='Test Flashcard',
            emoji='📚',
            question='What is this?',
            answer='A test flashcard'
        )
        self.assertEqual(flashcard.notes, self.note)
        self.assertEqual(flashcard.title, 'Test Flashcard')
        self.assertEqual(flashcard.emoji, '📚')
        self.assertEqual(flashcard.question, 'What is this?')
        self.assertEqual(flashcard.answer, 'A test flashcard')


    def test_events_creation(self):
        event = Events.objects.create(
            title='Test Event',
            date=timezone.now().date(),
            user=self.user1
        )
        self.assertEqual(event.title, 'Test Event')
        self.assertEqual(event.user, self.user1)
        self.assertTrue(event.is_active)

class FilterNotesViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="test413@gmail.com",username='testuser', password='password1!')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.assertEqual(self.user.email,"test413@gmail.com")
        Notes.objects.create(title="Note 1", user=self.user, content="This is a test note.")
        Notes.objects.create(title="Note 2", user=self.user, content="Another test content.")
        Notes.objects.create(title="Note 3", user=self.user, content="Irrelevant content.")

    def test_filter_notes(self):
        response = self.client.get('/notes/filter/', {'keyword': 'test'})
        self.assertEqual(response.status_code, 200)
        self.assertIn("notes_ids", response.data)
        self.assertEqual(len(response.data["notes_ids"]), 2)  
        
class FriendshipSharingTestCase(TestCase):
    def setUp(self):
        
        self.user1 = User.objects.create_user(email="test1@gmail.com",username='testuser1', password='password1!')
        self.user2 = User.objects.create_user(email="test2@gmail.com",username='testuser2', password='password1!')

        self.note = Notes.objects.create(title="Test Note", content="This is a test note.", user=self.user1)

    def test_friend_request_and_note_sharing(self):
        friend_request = FriendRequest.objects.create(from_user=self.user1, to_user=self.user2)
        self.assertEqual(FriendRequest.objects.count(), 1)
        self.assertFalse(friend_request.accepted)

        friend_request.accepted = True
        friend_request.accepted_at = timezone.now()
        friend_request.save()

        Friendship.objects.create(user1=self.user1, user2=self.user2)
        Friendship.objects.create(user1=self.user2, user2=self.user1)

        self.assertEqual(Friendship.objects.count(), 2)

        shared_note = SharedNote.objects.create(note=self.note, shared_with=self.user2, shared_by=self.user1)
        self.assertEqual(SharedNote.objects.count(), 1)

        self.assertEqual(shared_note.note, self.note)
        self.assertEqual(shared_note.shared_with, self.user2)
        
