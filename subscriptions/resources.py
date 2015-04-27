# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.validation import FormValidation
from subscriptions.models import Subscriber
from subscriptions.forms import SubscriberForm


class SubscriberResource(ModelResource):

    class Meta:
        queryset = Subscriber.objects.all()
        resource_name = 'subscribers'
        authorization = Authorization()
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post']
        validation = FormValidation(form_class=SubscriberForm)
