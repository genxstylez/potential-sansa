# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from photos.models import Album
from redactor.widgets import RedactorEditor


class AlbumForm(forms.ModelForm):

    class Meta:
        model = Album
        fields = ['name', 'zh_name', 'published', 'photographer']
        widgets = {
            'photographer': RedactorEditor()
        }
