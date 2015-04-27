# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tastypie.resources import ModelResource
from subscriptions.models import Subscriber


class SubscriberResource(ModelResource):

    class Meta:
        queryset = Subscriber.objects.all()
        resource_name = 'subscribers'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post']
