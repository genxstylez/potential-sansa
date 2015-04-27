from django.conf.urls import include, url
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.conf import settings
from django.contrib import admin
from tastypie.api import Api
from posts.resources import CategoryResource, PostResource, StarredResource, ImageResource
from subscriptions.resources import SubscriberResource

v1_api = Api(api_name='v1')
v1_api.register(CategoryResource())
v1_api.register(PostResource())
v1_api.register(StarredResource())
v1_api.register(ImageResource())
v1_api.register(SubscriberResource())

urlpatterns = [
    # Examples:
    # url(r'^$', 'ology.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^jsreverse/$', 'django_js_reverse.views.urls_js', name='js_reverse'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^posts/', include('posts.urls')),
    url(r'^api/', include(v1_api.urls)),
    url(r'^_search/$', 'ology.views.search', name='search'),
    url(r'^$', TemplateView.as_view(template_name='app.html'), name='index'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
