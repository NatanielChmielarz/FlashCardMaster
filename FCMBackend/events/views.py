from django.shortcuts import render
from rest_framework import generics, status
from core.models import Events
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from core.api.serializers import EventsSerializer
from core.api.permision import UserOrReadOnly
from rest_framework.decorators import api_view, permission_classes

class EventsListCreateView(generics.ListCreateAPIView):
    """
    This class-based view provides a list of events and allows creating new events.
    It uses the EventsSerializer to serialize the data and requires the UserOrReadOnly and IsAuthenticated permissions.
    """
    serializer_class = EventsSerializer
    permission_classes = [UserOrReadOnly, IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        """
        This method retrieves the queryset of events for the current user.
        It takes the user_id from the request and the optional is_active parameter.
        It filters the Events model based on the user and the is_active parameter.
        """
        user_id = self.request.user.id
        is_active = self.request.query_params.get('is_active')
        queryset = Events.objects.filter(user=user_id)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
        return queryset

    def list(self, request, *args, **kwargs):
        """
        This method returns a list of events in a JSON format.
        It retrieves the queryset of events and serializes it using the EventsSerializer.
        The serialized data is then returned as a Response object.
        """
        queryset = self.get_queryset()
        data = [{'title': event.title, 'date': event.date, 'id': event.id,"is_active":event.is_active} for event in queryset]
        return Response(data)

    def perform_create(self, serializer):
        """
        This method saves a new event with the user as the owner.
        It takes the serialized data and saves it to the Events model with the current user as the owner.
        """
        serializer.save(user=self.request.user)


class EventsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """
    This class-based view provides a way to retrieve, update, and delete events.
    It uses the EventsSerializer to serialize the data and requires the UserOrReadOnly and IsAuthenticated permissions.
    """
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    permission_classes = [UserOrReadOnly, IsAuthenticated]


@api_view(['POST'])
@permission_classes([UserOrReadOnly, IsAuthenticated])
def mark_as_completed(request, pk):
    """
    This method marks an event as completed.
    It takes the primary key of the event and retrieves it from the database.
    If the event does not exist, it returns a 404 Not Found response.
    Otherwise, it sets the is_active field to False and saves the changes.
    Finally, it returns a 200 OK response.
    """
    try:
        event = Events.objects.get(pk=pk)
    except Events.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    event.is_active = not event.is_active
    event.save()
    return Response(status=status.HTTP_200_OK)

