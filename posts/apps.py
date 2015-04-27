# -*- coding: utf-8 -*-
from django.apps import AppConfig
import watson


def dumps_credits(post):
    return dict(post.credits)


class PostsAppConfig(AppConfig):
    name = 'posts'

    def ready(self):
        post_model = self.get_model('Post')
        image_model = self.get_model('Image')

        watson.register(post_model.objects.filter(published=True), fields=('heading', 'subheading', 'articletext', 'credits'))
        watson.register(image_model.objects.filter(post__published=True))
