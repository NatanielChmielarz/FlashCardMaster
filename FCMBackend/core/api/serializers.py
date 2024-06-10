from rest_framework import serializers
from core.models import Notes, Flashcards,Events
class NotesSerializer(serializers.ModelSerializer):
    flashcards_count = serializers.SerializerMethodField()

    def get_flashcards_count(self, obj):
        return obj.flashcards.count()

    class Meta:
        model = Notes
        exclude = ('user',)

        
class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcards
        exclude =('notes',)
        
        
class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        exclude = ('user',)