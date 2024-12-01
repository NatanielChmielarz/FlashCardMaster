from django.urls import path,include
from core.api.views import (NotesListCreateView , NotesDeteilsView,FlashcardListCreateView,
                            FlashcardDetailsView,FilterNotesView
                            )

urlpatterns = [
     path('',NotesListCreateView.as_view()),
     path("<int:id>/",NotesDeteilsView.as_view()),
     path("<int:id>/flashcards",FlashcardListCreateView.as_view()),
     path("flashcard/<int:id>/",FlashcardDetailsView.as_view()),
     path('filter/', FilterNotesView.as_view(), name='filter_notes'),
     
    
     
]