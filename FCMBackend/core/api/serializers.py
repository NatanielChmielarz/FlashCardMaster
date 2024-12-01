from rest_framework import serializers
from core.models import Notes, Flashcards,Events,Tabs,FriendRequest, Friendship, SharedNote
from user_app.models import User
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
    to_user_email = serializers.EmailField(write_only=True)  
    from_user_email = serializers.SerializerMethodField()  

    class Meta:
        model = FriendRequest
        fields = ['id', 'to_user_email', 'from_user_email', 'accepted', 'sent_at', 'accepted_at']
        read_only_fields = ['id', 'from_user_email', 'accepted', 'sent_at', 'accepted_at']

    def get_from_user_email(self, obj):
        return obj.from_user.email

    def create(self, validated_data):
        to_user_email = validated_data.pop('to_user_email')

        try:
            to_user = User.objects.get(email=to_user_email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"to_user_email": "User with this email does not exist."})

        from_user = validated_data["from_user"]
        if FriendRequest.objects.filter(from_user=from_user, to_user=to_user).exists():
            raise serializers.ValidationError({"Friend_request": "You have already sent a request to this user."})

        validated_data['to_user'] = to_user

        return FriendRequest.objects.create(**validated_data)

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
