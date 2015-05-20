# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from photos.models import Photo
from suit_redactor.widgets import RedactorWidget


class PhotoForm(forms.ModelForm):

    class Meta:
        model = Photo
        fields = ['album', 'caption', 'img', 'photographer']
        widgets = {
            'photographer': RedactorWidget(editor_options={
                'language': 'zh-Hant',
                'focus': True,
                'minHeight': '200',
                'minWidth': '400',
                'buttons': ['bold', 'italic', 'link', 'underline', 'fontcolor', 'formatting'],
            })
        }
