# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from posts.models import Image, Post
from suit_redactor.widgets import RedactorWidget


class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ['heading', 'subheading', 'category', 'credits', 'articletext', 'starred', 'published']
        widgets = {
            'articletext': RedactorWidget(editor_options={
                'language': 'zh-Hant',
                'focus': True,
                'minHeight': '500',
                'buttons': ['bold', 'italic', 'link', 'underline', 'fontcolor'],
            })
        }

'''
ckedit_options = {
    'language': 'zh-Hant',
    'height': '500px',
    'toolbar': [
        {'name': 'colors', 'items': ['TextColor']},
        {'name': 'links', 'items': ['Link', 'Unlink', 'Anchor']},
        {'name': 'basicstyles', 'items': ['Bold', 'Italic', 'Underline']},
    ]
}
'''


class StarredPostForm(PostForm):

    def __init__(self, *args, **kwargs):
        super(StarredPostForm, self).__init__(*args, **kwargs)
        self.fields['starred'].initial = True


class ImageForm(forms.ModelForm):

    class Meta:
        model = Image
        fields = ['post', 'is_cover', 'caption', 'img']
