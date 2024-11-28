from rest_framework import serializers
from core.models import Notes, Flashcards,Events,Tabs,FriendRequest, Friendship, SharedNote
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
        
        
class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'accepted', 'sent_at', 'accepted_at']
        read_only_fields = ['from_user', 'accepted', 'sent_at', 'accepted_at']


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = ['id', 'user1', 'user2', 'created_at']
        read_only_fields = ['created_at']


class SharedNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedNote
        fields = ['id', 'note', 'shared_with', 'shared_by', 'shared_at']
        read_only_fields = ['shared_by', 'shared_at']
