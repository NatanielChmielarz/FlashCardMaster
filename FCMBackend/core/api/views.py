from django.shortcuts import render
from rest_framework import generics
from core.api.serializers import NotesSerializer, FlashcardSerializer,SharedNoteSerializer,FriendRequestSerializer,FriendshipSerializer
from core.api.permision import UserOrReadOnly,IsNotesOwner
from core.models import Notes , Flashcards,SharedNote,Friendship,FriendRequest
from user_app.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db import IntegrityError
from django.utils import timezone
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
    
class FilterNotesView(APIView):
    permission_classes = [IsNotesOwner,IsAuthenticated]

    def get(self, request):
        user = request.user  # Pobranie użytkownika z tokenu
        keyword = request.query_params.get('keyword', '')  # Pobranie słowa kluczowego z query params

        if len(keyword) < 3:
            return Response({"error": "Keyword must be at least 3 characters long."}, status=status.HTTP_400_BAD_REQUEST)

        notes = Notes.objects.filter(user=user, content__icontains=keyword)
        fields = ['id','title']
        notes_ids = notes.values_list( *fields)
        return Response({"notes_ids": list(notes_ids)}, status=status.HTTP_200_OK)

class FriendRequestListView(generics.ListAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = [UserOrReadOnly,IsAuthenticated]
    def get_queryset(self):
        id = self.request.user.id
        return FriendRequest.objects.filter(to_user=id, accepted=False)


class FriendRequestCreateView(generics.CreateAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = [UserOrReadOnly,IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(from_user=self.request.user)

# Akceptowanie zaproszeń
class FriendRequestAcceptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            # Znajdź zaproszenie wysłane do zalogowanego użytkownika, które nie zostało jeszcze zaakceptowane
            friend_request = FriendRequest.objects.get(pk=pk, to_user=request.user, accepted=False)
        except FriendRequest.DoesNotExist:
            return Response({"error": "Zaproszenie nie istnieje lub już zostało zaakceptowane."},
                            status=status.HTTP_404_NOT_FOUND)

        # Akceptowanie zaproszenia
        friend_request.accepted = True
        friend_request.accepted_at = timezone.now()
        friend_request.save()

        # Tworzenie wzajemnych relacji znajomości
        try:
            Friendship.objects.create(user1=friend_request.from_user, user2=friend_request.to_user)
            Friendship.objects.create(user1=friend_request.to_user, user2=friend_request.from_user)
        except IntegrityError:
            # W przypadku duplikatu relacji znajomości
            return Response({"error": "Relacja znajomości już istnieje."},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Zaproszenie zostało zaakceptowane!"}, status=status.HTTP_200_OK)  
    
class FriendRequestRejectView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            # Znajdź zaproszenie skierowane do zalogowanego użytkownika
            friend_request = FriendRequest.objects.get(pk=pk, to_user=request.user, accepted=False)
        except FriendRequest.DoesNotExist:
            return Response({"error": "Zaproszenie nie istnieje lub już zostało zaakceptowane."},
                            status=status.HTTP_404_NOT_FOUND)

        # Usunięcie zaproszenia
        friend_request.delete()
        return Response({"message": "Zaproszenie zostało odrzucone i usunięte."}, status=status.HTTP_200_OK)
    
    
    
class FriendShipListView(generics.ListAPIView):
    serializer_class = FriendshipSerializer
    permission_classes = [UserOrReadOnly,IsAuthenticated]
    def get_queryset(self):
        id = self.request.user.id
        return Friendship.objects.filter(user1=id)
    
class FriendShipDeleteView(generics.DestroyAPIView):
    queryset = Friendship.objects.all()
    lookup_field = 'id'
    serializer_class = FriendshipSerializer
    permission_classes = [UserOrReadOnly,IsAuthenticated]
   
    
    

