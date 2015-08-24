# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from posts.models import Image, Post
from redactor.widgets import RedactorEditor


class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ['heading', 'subheading', 'category', 'articletext', 'starred', 'published']
        widgets = {
            'articletext': RedactorEditor()
        }


class StarredPostForm(PostForm):

    def __init__(self, *args, **kwargs):
        super(StarredPostForm, self).__init__(*args, **kwargs)
        self.fields['starred'].initial = True


class ImageForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ['id', 'post', 'caption', 'tag', 'video_url', 'select_text']
