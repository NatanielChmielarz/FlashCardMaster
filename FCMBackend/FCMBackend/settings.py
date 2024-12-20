"""
Django settings for FCMBackend project.

Generated by 'django-admin startproject' using Django 4.2.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import datetime
import os 
from dotenv import load_dotenv
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv()


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY =  os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG")  == 'True'

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS').split(',')
CSRF_TRUSTED_ORIGINS = ['http://localhost:5173','https://flash-card-master.vercel.app']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
     'rest_framework',
    'rest_framework_simplejwt',
     'user_app',
     'core',
     'rest_framework_swagger',
    'drf_yasg',
    'corsheaders',
    'events'
    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = 'FCMBackend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'FCMBackend.wsgi.application'
EMAIL_BACKEND ='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST =  'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS =True
EMAIL_USE_SSL = False
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD") 

DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators
ADMIN_USER_NAME="Admin user"
ADMIN_USER_EMAIL=""

MANAGERS=[]
ADMINS=[]
if all([ADMIN_USER_NAME, ADMIN_USER_EMAIL]):
    ADMINS +=[
        (f'{ADMIN_USER_NAME}', f'{ADMIN_USER_EMAIL}')
    ]
    MANAGERS=ADMINS

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': os.getenv('PGDATABASE'),
    'USER': os.getenv('PGUSER'),
    'PASSWORD': os.getenv('PGPASSWORD'),
    'HOST': os.getenv('PGHOST'),
    'PORT': os.getenv('PGPORT', 5432),
    'OPTIONS': {
      'sslmode': 'require',
      'options':'endpoint=ep-purple-grass-a2pfellb'
    },
  }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:9000",
    'https://flash-card-master.vercel.app'
]

CORS_ALLOW_HEADERS = (
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
)
# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES':     ('rest_framework.permissions.IsAuthenticated',),
    'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework_simplejwt.authentication.JWTAuthentication',),   
}
SIMPLE_JWT = {
     'ACCESS_TOKEN_LIFETIME': datetime.timedelta(minutes=30),
     'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=1),
}
# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/
AUTH_USER_MODEL = 'user_app.User'
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
