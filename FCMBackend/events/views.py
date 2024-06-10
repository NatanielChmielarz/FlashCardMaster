from django.shortcuts import render
from rest_framework import generics
from core.models import Events
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Response
from core.api.serializers import EventsSerializer
from core.api.permision import UserOrReadOnly
# Create your views here.
class EventsListCreateView(generics.ListCreateAPIView):
    serializer_class = EventsSerializer
    permission_classes = [UserOrReadOnly,IsAuthenticated]
    
    def get_queryset(self):
        id = self.request.user.id
        return Events.objects.filter(user=id)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = [{'title': note.title, 'id': note.id} for note in queryset]
        return Response(data)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        
class EventsDeteilsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    lookup_field='id'
    permission_classes = [UserOrReadOnly,IsAuthenticated] 