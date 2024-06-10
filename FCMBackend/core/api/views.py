from django.shortcuts import render
from rest_framework import generics
from core.api.serializers import NotesSerializer, FlashcardSerializer
from core.api.permision import UserOrReadOnly,IsNotesOwner
from core.models import Notes , Flashcards
from user_app.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response
# Create your views here.
    
class NotesListCreateView(generics.ListCreateAPIView):
    serializer_class = NotesSerializer
    permission_classes = [UserOrReadOnly,IsAuthenticated]
    
    def get_queryset(self):
        id = self.request.user.id
        return Notes.objects.filter(user=id)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = [{'title': note.title, 'id': note.id} for note in queryset]
        return Response(data)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        
class FlashcardListCreateView(generics.ListCreateAPIView):
    serializer_class = FlashcardSerializer
    permission_classes=[IsNotesOwner,IsAuthenticated]
    
    def get_queryset(self):
        id = self.kwargs['id']
        return  Flashcards.objects.filter(notes=id)
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = [{'title': flashcard.title, 'id': flashcard.id,'question':flashcard.question,'answer':flashcard.answer ,'emoji':flashcard.emoji} for flashcard in queryset]
        return Response(data)
    def perform_create(self, serializer):
        id = self.kwargs['id']
        notes = Notes.objects.get(id=id)
        serializer.save(notes=notes)
        
class NotesDeteilsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer
    lookup_field='id'
    permission_classes = [UserOrReadOnly,IsAuthenticated] 
    
class FlashcardDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flashcards.objects.all()
    serializer_class = FlashcardSerializer
    lookup_field='id'
    permission_classes = [IsNotesOwner,IsAuthenticated] 
