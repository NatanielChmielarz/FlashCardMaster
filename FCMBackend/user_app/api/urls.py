from django.urls import path,include
from user_app.api.views import SignupAPIView,PasswordResetAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from core.api.views import(  FriendRequestListView, 
                            FriendRequestCreateView,  FriendRequestAcceptView, FriendRequestRejectView)
app_name = 'authentication'
urlpatterns = [
     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
     path('register/',SignupAPIView.as_view(), name='user-register'),
     path('password_reset/',PasswordResetAPIView.as_view(), name='password-reset'),
     path('friend-requests/', FriendRequestListView.as_view(), name='friend-request-list'),
     path('friend-requests/create/', FriendRequestCreateView.as_view(), name='friend-request-create'),
     path('friend-requests/accept/<int:pk>/', FriendRequestAcceptView.as_view(), name='friend-request-accept'),
     path('friend-requests/reject/<int:pk>/', FriendRequestRejectView.as_view(), name='friend-request-reject'),
     
]