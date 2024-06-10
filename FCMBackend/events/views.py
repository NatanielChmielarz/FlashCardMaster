from django.shortcuts import render
from rest_framework import generics, status
from core.models import Events
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response
from core.api.serializers import EventsSerializer
from core.api.permision import UserOrReadOnly
from rest_framework.decorators import api_view

class EventsListCreateView(generics.ListCreateAPIView):
    serializer_class = EventsSerializer
    permission_classes = [UserOrReadOnly,IsAuthenticated]
    
    def get_queryset(self):
        id = self.request.user.id
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            queryset = Events.objects.filter(is_active=is_active.lower() == 'true')
        
        return queryset.filter(user=id)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = [{'title': event.title, 'id': event.id} for event in queryset]
        return Response(data)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        
class EventsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Events.objects.all()
    serializer = EventsSerializer
    permission_classes=[UserOrReadOnly,IsAuthenticated]
@api_view(['POST'])
def mark_as_completed(request, pk):
    try:
        event = Events.objects.get(pk=pk)
    except Events.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    event.is_active = False
    event.save()
    return Response(status=status.HTTP_200_OK)