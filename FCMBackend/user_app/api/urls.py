from django.urls import path,include
from user_app.api.views import SignupAPIView,PasswordResetAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
app_name = 'authentication'
urlpatterns = [
     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
     path('register/',SignupAPIView.as_view(), name='user-register'),
     path('password_reset/',PasswordResetAPIView.as_view(), name='password-reset')
     
]