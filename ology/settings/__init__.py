"""
Django settings for ology project.

Generated by 'django-admin startproject' using Django 1.8.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import dj_database_url
import django_cache_url

import os
import random

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_PATH = os.path.abspath(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', '{:030x}'.format(random.randrange(16 ** 30)))

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

JS_DEBUG = DEBUG

ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '*').split()

ADMINS = (
    ('Sam Liu', 'genxstylez@gmail.com'),
)

# Application definition

INSTALLED_APPS = (
    'suit',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'redactor',
    'ology',
    'posts',
    'subscriptions',
    'photos',
    'tastypie',
    'easy_thumbnails',
    'storages',
    'watson',
    'taggit',
    'staff',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'watson.middleware.SearchContextMiddleware',
)

ROOT_URLCONF = 'ology.urls'

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

WSGI_APPLICATION = 'ology.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.config(env='DATABASE_URL')
}

if DATABASES['default']['ENGINE'] == 'django.db.backends.postgresql_psycopg2':
    DATABASES['default']['OPTIONS'] = {}
    DATABASES['default']['OPTIONS']['autocommit'] = True


CACHES = {
    'default': django_cache_url.config(env='DEFAULT_CACHE_URL')
}

SESSION_ENGINE = 'django.contrib.sessions.backends.cached_db'

# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'zh-hant'

TIME_ZONE = 'Asia/Taipei'

USE_I18N = True

USE_L10N = True

USE_TZ = True

DEFAULT_CHARSET = 'utf-8'

from django.conf.global_settings import TEMPLATE_CONTEXT_PROCESSORS as TCP

TEMPLATE_CONTEXT_PROCESSORS = TCP + (
    'django.core.context_processors.request',
    'ology.context_processors.js_debug',
)

# Static files (CSS, JavaScript, Images)

STATIC_ROOT = os.path.join(ROOT_PATH, '../assets/')

STATIC_URL = os.environ.get('DJANGO_STATIC_URL', '/static/')

STATICFILES_DIRS = (
    os.path.join(ROOT_PATH, 'static'),
)

MEDIA_ROOT = os.path.join(ROOT_PATH, 'media/')  # TODO: change to '../media'

MEDIA_URL = os.environ.get('DJANGO_MEDIA_URL', '/media/')

DEFAULT_FILE_STORAGE = 'ology.storage.DefaultStorage'
STATICFILES_STORAGE = 'ology.storage.StaticStorage'

# EMAIL
SERVER_EMAIL = 'webmaster@o-logy.com'

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587

EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')


# EASY_THUMBNAILS
THUMBNAIL_ALIASES = {
    'posts.Image.img': {
        'small': {'size': (150, 0), 'crop': 'scale'},
        'medium': {'size': (320, 0), 'crop': 'scale'},
        'large': {'size': (640, 0), 'crop': 'scale'},
        'xl': {'size': (1280, 0), 'crop': 'scale'},
        'xxl': {'size': (1680, 0), 'crop': 'scale'}
    },
    'photos.Photo.img': {
        'small': {'size': (150, 0), 'crop': 'scale'},
        'medium': {'size': (320, 0), 'crop': 'scale'},
        'large': {'size': (640, 0), 'crop': 'scale'},
        'xl': {'size': (1280, 0), 'crop': 'scale'},
        'xxl': {'size': (1680, 0), 'crop': 'scale'}
    }
}

THUMBNAIL_DEFAULT_STORAGE = 'ology.storage.DefaultStorage'

# AWS
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID', 'test')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_KEY', 'test')
AWS_S3_CUSTOM_DOMAIN = os.environ.get('AWS_S3_CUSTOM_DOMAIN')  # CDN address.
AWS_MEDIA_STORAGE_BUCKET_NAME = os.environ.get('AWS_MEDIA_STORAGE_BUCKET_NAME', 'ology-media-dev')
AWS_STATIC_STORAGE_BUCKET_NAME = os.environ.get('AWS_STATIC_STORAGE_BUCKET_NAME', 'ology-static-dev')

AWS_S3_SECURE_URLS = False
AWS_QUERYSTRING_AUTH = False
AWS_S3_FILE_OVERWRITE = False
AWS_HEADERS = {
    'Expires': 'Thu, 31 Dec 2020 23:59:59 GMT',
    'Cache-Control': 'max-age=99999',
}

REDACTOR_OPTIONS = {
    'lang': 'zh_tw',
    'focus': 'true',
    'minHeight': '500',
    'buttons': ['bold', 'italic', 'link', 'underline', 'fontcolor', 'formatting'],
    'plugins': ['scriptbuttons']
}
# RAVEN
# Set your DSN value
RAVEN_CONFIG = {
    'dsn': os.environ.get('SENTRY_DSN'),
}
if os.environ.get('SENTRY_DSN'):
    INSTALLED_APPS = INSTALLED_APPS + (
        'raven.contrib.django.raven_compat',
    )
