"""
WSGI config for ology project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ology.settings")


def get_application():
    return reduce(lambda app, wrapper: wrapper(app), [], get_wsgi_application())

application = get_application()
