from rest_framework import serializers
from user_app.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
class SignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_style':'password'},write_only=True)
    class Meta:
        model= User
        fields=('email','username','password','confirm_password')
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def create(self,validated_data):
        if User.objects.filter(email=self.validated_data.get("email")).exists():
            raise serializers.ValidationError({'error': 'Email already exists'})
        if User.objects.filter(email=self.validated_data.get("username")).exists():
            raise serializers.ValidationError({'error': 'Username already exists'})
        if validate_password(validated_data['password']) == None:
               password = make_password(validated_data['password'])
               account = User.objects.create(email=validated_data.get("email"),username=validated_data.get("username"),password=password)
        return account