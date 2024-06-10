from django.urls import path,include
from events.views import EventsListCreateView, EventsRetrieveUpdateDestroy, mark_as_completed

urlpatterns = [
     path('',EventsListCreateView.as_view()),
        path('<int:pk>/', EventsRetrieveUpdateDestroy.as_view(), name='event-detail'),
    path('<int:pk>/mark_as_completed/', mark_as_completed, name='event-mark-as-completed'),

     
     
]