from django.apps import AppConfig
import watson


class OlogyAppConfig(AppConfig):
    name = 'ology'

    def ready(self):
        post_model = self.get_model('posts.models.Post')
        image_model = self.get_model('posts.models.Image')

        watson.register(post_model)
        watson.register(image_model)
