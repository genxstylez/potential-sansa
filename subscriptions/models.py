# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed = models.BooleanField(default=True)
