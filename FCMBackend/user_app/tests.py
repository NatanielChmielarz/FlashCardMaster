from django.test import TestCase
from user_app.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from core.models import FriendRequest,Friendship
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
        self.login_url ='/account/token/'
        self.register_url = '/account/register/'
        self.token_verification_url = '/account/token/verify/'
        self.token_refresh_url = '/account/token/refresh/'
    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
       
        data = {'username': self.username,"email": self.valid_email,"password": self.password,"confirm_password":self.password}
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "test_username")
    def test_create_account_with_invalid_email(self):
       
        data = {'username': self.username,"email": self.invalid_email,"password": self.password,"confirm_password":self.password}
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    def test_register_and_login_with_token(self):
        register_data = {'username': self.username,"email": self.valid_email,"password": self.password,"confirm_password":self.password}
        login_data ={"email": self.valid_email,"password": self.password}
        response = self.client.post(self.register_url, register_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        access_token ={"token":response.data['access']} 
        response = self.client.post(self.token_verification_url,access_token)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
class FriendRequestCreationTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(email='user1@test.com', username='user1', password='password123')
        self.user2 = User.objects.create_user(email='user2@test.com', username='user2', password='password123')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user1)

    def test_create_friend_request_success(self):
        payload = {"to_user_email": self.user2.email}
        response = self.client.post('/account/friend-requests/create/', data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FriendRequest.objects.count(), 1)
        friend_request = FriendRequest.objects.first()
        self.assertEqual(friend_request.from_user, self.user1)
        self.assertEqual(friend_request.to_user, self.user2)
        self.assertFalse(friend_request.accepted)

    def test_create_friend_request_nonexistent_user(self):
        payload = {"to_user_email": "nonexistent@test.com"}
        response = self.client.post('/account/friend-requests/create/', data=payload)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
        self.assertEqual(FriendRequest.objects.count(), 0)
        self.assertIn("to_user_email", response.data)
        

class FriendRequestCreationTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(email='user1@test.com', username='user1', password='password123')
        self.user2 = User.objects.create_user(email='user2@test.com', username='user2', password='password123')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user1)

    def test_create_friend_request_success(self):
        payload = {"to_user_email": self.user2.email}
        response = self.client.post('/account/friend-requests/create/', data=payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(FriendRequest.objects.count(), 1)
        friend_request = FriendRequest.objects.first()
        self.assertEqual(friend_request.from_user, self.user1)
        self.assertEqual(friend_request.to_user, self.user2)
        self.assertFalse(friend_request.accepted)

    def test_create_friend_request_nonexistent_user(self):
        payload = {"to_user_email": "nonexistent@test.com"}
        response = self.client.post('/account/friend-requests/create/', data=payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(FriendRequest.objects.count(), 0)
        self.assertIn("to_user_email", response.data)

class FriendRequestAcceptanceTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(email='user1@test.com', username='user1', password='password123')
        self.user2 = User.objects.create_user(email='user2@test.com', username='user2', password='password123')
        self.friend_request = FriendRequest.objects.create(from_user=self.user1, to_user=self.user2)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user2)

    def test_accept_friend_request_success(self):
        response = self.client.post(f'/account/friend-requests/accept/{self.friend_request.pk}/')
        self.assertEqual(response.status_code, 200)
        self.friend_request.refresh_from_db()
        self.assertTrue(self.friend_request.accepted)
        self.assertEqual(Friendship.objects.count(), 2)
        friendships = Friendship.objects.filter(user1=self.user1, user2=self.user2)
        self.assertTrue(friendships.exists())
        
class FriendRequestRejectionTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(email='user1@test.com', username='user1', password='password123')
        self.user2 = User.objects.create_user(email='user2@test.com', username='user2', password='password123')
        self.friend_request = FriendRequest.objects.create(from_user=self.user1, to_user=self.user2)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user2)

    def test_reject_friend_request_success(self):
        response = self.client.delete(f'/account/friend-requests/reject/{self.friend_request.pk}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(FriendRequest.objects.count(), 0)
        self.assertEqual(Friendship.objects.count(), 0)

    def test_reject_nonexistent_friend_request(self):
        response = self.client.delete('/account/friend-requests/reject/999/')
        self.assertEqual(response.status_code, 404)
        self.assertIn("error", response.data)
        
        
class FriendShipUnitTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(email='user1@test.com', username='user1', password='password!123')
        self.user2 = User.objects.create_user(email='user2@test.com', username='user2', password='password!123')
        
        
    def test_friendship_creation(self):
       friendship = Friendship.objects.create(user1=self.user1, user2=self.user2)
       self.assertEqual(Friendship.objects.count(), 1)
       self.assertEqual(friendship.user1, self.user1)
       self.assertEqual(friendship.user2, self.user2)
       
    def test_friendship_deletion(self):
        friendship = Friendship.objects.create(user1=self.user1, user2=self.user2)
        friendship.delete()
        self.assertEqual(Friendship.objects.count(), 0)