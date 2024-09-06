from django.test import TestCase
from user_app.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
# Create your tests here.
class UserModelTest(TestCase):
    
    def setUp(self):
        """Set up the data for user model"""
        self.username="test_username"
        self.valid_email = "test@example.com"
        self.invalid_email = "invalid-email"
        self.password = "StrongPassword123!"
        self.weak_password = "123"
        
    def test_create_user_with_valid_email(self):
        """Testing creating user with valid email"""
        user = User.objects.create_user(email=self.valid_email,username=self.username,
                                        password=self.password)
        self.assertEqual(user.email, self.valid_email)
        self.assertTrue(user.check_password(self.password))

    def test_create_user_with_invalid_email(self):
        """Testing creating user with invalid email"""
        with self.assertRaises(ValueError):
            User.objects.create_user(email=self.invalid_email,username=self.username,
                                     password=self.password)

    def test_create_user_with_invalid_password(self):
        """Testing creating user with invalid password."""
        with self.assertRaises(ValueError):
            User.objects.create_user(email=self.invalid_email,username=self.username,
                                     password=self.weak_password)

    def test_create_superuser(self):
        """Testing creating superusers"""
        admin_user = User.objects.create_superuser(email=self.valid_email,username=self.username,
                                                   password=self.password)
        self.assertTrue(admin_user.is_superuser)
        self.assertTrue(admin_user.is_admin)
        
class User_Views_Test(APITestCase):
    def setUp(self):
        """Set up the data for user model"""
        self.username="test_username"
        self.valid_email = "test@example.com"
        self.invalid_email = "invalid-email"
        self.password = "StrongPassword123!"
        self.weak_password = "123"
    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url ='/account/register/'
        data = {'username': self.username,"email": self.valid_email,"password": self.password}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().name, "test_username")