from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
import re
from django.utils.timezone import now
from datetime import timedelta
regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
class UserManager(BaseUserManager):
    def create_user(self,email,username,password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have an username')
        if not re.fullmatch(regex, email):
            raise ValueError('Invalid email address')
       
        user = self.model(
            email= self.normalize_email(email),
            username=username
        )
        
        user.set_password(password)
       
        user.save(using=self._db)
        return user
    def create_staffuser(self, email, username,password=None):
     user = self.create_user(email,username,
             password=password
     )
     user.is_staff = True
    
     user.save(using=self._db)
     
     return user
    def create_superuser(self, email,username,  password=None):
        user = self.create_user(email,username,
                password=password
                
        )
       
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        
        return user
class User(AbstractBaseUser):
   
    
    email =models.EmailField(max_length=100,unique=True)
    username = models.CharField(max_length=50,unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now=True)
    modified_date = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]
    objects = UserManager()
    
    def has_module_perms(self, app_label):
        return True
    def __str__(self):
        return self.email
    def has_perm(self, perm, obj=None):
        return self.is_admin

class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        return now() < self.created_at + timedelta(minutes=10)