from django.urls import path,include
from events.views import EventsListCreateView , EventsDeteilsView

urlpatterns = [
     path('',EventsListCreateView.as_view()),
     path("<int:id>/",EventsDeteilsView.as_view()),

     
     
]