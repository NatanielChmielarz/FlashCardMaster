from user_app.models import User
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from user_app.models import PasswordResetToken
import secrets
from django.core.mail import send_mail
from django.http import JsonResponse
from user_app.api.serializers import SignupSerializer
from django.contrib.auth.hashers import make_password
from django.conf import settings

ADMIN_USER_EMAIL= settings.ADMIN_USER_EMAIL
EMAIL_HOST_USER = settings.EMAIL_HOST_USER


class SignupAPIView(APIView):
    permission_classes = []
    def post(self, request):
        password = request.POST.get('password', None)
        confirm_password = request.POST.get('confirm_password', None)
        if password == confirm_password: 
            serializer = SignupSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            data = serializer.data
            response = status.HTTP_201_CREATED
        else:
            data = ''
            raise ValidationError({'password_mismatch': 'Password fields didn not match.'})
        return Response(data, status=response)
    
class PasswordResetAPIView(APIView):
    permission_classes = []
    def post(self, request, *args, **kwargs):
        if 'email' in request.data:  # Obsługa żądania wysyłania e-maila resetującego
            email = request.data.get('email').lower()
        
            try:
                user = User.objects.get(email=email)
                token = secrets.token_hex(32)
                PasswordResetToken.objects.create(user=user, token=token)

                reset_url = f"https://flash-card-master.vercel.app/Change_password?token={token}"
                
                print(ADMIN_USER_EMAIL , EMAIL_HOST_USER)
                send_mail(
                    "Password reset",
                    f"Go to : {reset_url} for password reset \n This link will be availble for 15 minutes",
                    EMAIL_HOST_USER,
                    [email],
                    fail_silently=False,
)
                return Response({'message': 'Reset email sent successfully.'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'Email not found.'}, status=status.HTTP_404_NOT_FOUND)

        elif 'token' in request.data and 'password' in request.data:  # Obsługa resetowania hasła
            token = request.data.get('token')
            new_password = request.data.get('password')

            try:
                password_reset_token = PasswordResetToken.objects.get(token=token)
                if not password_reset_token.is_valid():
                    return Response({'error': 'Token expired or invalid.'}, status=status.HTTP_400_BAD_REQUEST)

                user = password_reset_token.user
                user.password = make_password(new_password)
                user.save()

                password_reset_token.delete()
                return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
            except PasswordResetToken.DoesNotExist:
                return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Invalid request data.'}, status=status.HTTP_400_BAD_REQUEST)