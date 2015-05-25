# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.apps import AppConfig
import watson


class PostsAppConfig(AppConfig):
    name = 'posts'

    def ready(self):
        post_model = self.get_model('Post')
        image_model = self.get_model('Image')
        credit_model = self.get_model('Credit')

        watson.register(post_model.objects.filter(published=True), fields=('heading', 'subheading', 'articletext', 'tags'))
        watson.register(image_model.objects.filter(post__published=True))
        watson.register(credit_model.objects.filter(post__published=True))
