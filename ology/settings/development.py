# -*- coding: utf-8 -*-
from __future__ import unicode_literals, print_function, absolute_import, division

from . import *

DEBUG = True
JS_DEBUG = DEBUG

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'


INSTALLED_APPS += (
    'debug_toolbar',
    'django_extensions',
)
# django-debug-toolbar
DEBUG_TOOLBAR_PATCH_SETTINGS = False
if not DEBUG_TOOLBAR_PATCH_SETTINGS:
    MIDDLEWARE_CLASSES += (
        'debug_toolbar.middleware.DebugToolbarMiddleware',
    )
