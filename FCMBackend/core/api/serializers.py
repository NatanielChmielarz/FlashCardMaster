from rest_framework import serializers
from core.models import Notes, Flashcards,Events,Tabs
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
        
class TabsSerializer(serializers.ModelSerializer):
    notes = NotesSerializer(many=True, read_only=True)

    class Meta:
        model = Tabs
        fields = ['id', 'name', 'user', 'notes'] 
               
class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        exclude = ('user',)