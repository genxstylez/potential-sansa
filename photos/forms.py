# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from photos.models import Photo
from redactor.widgets import RedactorEditor


class PhotoForm(forms.ModelForm):

    class Meta:
        model = Photo
        fields = ['album', 'caption', 'img', 'photographer']
        widgets = {
            'photographer': RedactorEditor()
        }
