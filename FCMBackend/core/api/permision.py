from rest_framework import permissions
from core.models import Notes 
class UserOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print(obj.user.id)
        return obj.user.id == request.user.id
    

class IsNotesOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        try:
            notes = Notes.objects.get(id=obj.notes.id)
        except (Notes.DoesNotExist, AttributeError):
            print("Notes not found or invalid object structure")
            return False

        is_owner = notes.user.id == request.user.id
        print(f"Checking ownership: Notes user ID {notes.user.id}, Request user ID {request.user.id}")
        print(f"Is owner: {is_owner}")
        return is_owner
       