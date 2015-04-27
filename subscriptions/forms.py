# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from subscriptions.models import Subscriber


class SubscriberForm(forms.ModelForm):

    class Meta:
        model = Subscriber

    def clean_email(self):
        data = self.cleaned_data['email']
        try:
            Subscriber.objects.get(email__iexact=data)
            raise forms.ValidationError('You are already subscribed to us!')
        except Subscriber.DoesNotExist:
            return data
