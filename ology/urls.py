from django.conf.urls import include, url
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.conf import settings
from django.contrib import admin
from tastypie.api import Api
from posts.resources import CategoryResource, PostResource, StarredResource, ImageResource
from posts.resources import AdminCategoryResource, AdminPostResource, ExtraAdminCategoryResource
from photos.resources import AlbumResource
from subscriptions.resources import SubscriberResource

v1_api = Api(api_name='v1')
v1_api.register(CategoryResource())
v1_api.register(PostResource())
v1_api.register(StarredResource())
v1_api.register(ImageResource())
v1_api.register(SubscriberResource())
v1_api.register(AlbumResource())

staff_api = Api(api_name='v1')
staff_api.register(AdminCategoryResource())
staff_api.register(ExtraAdminCategoryResource())
staff_api.register(AdminPostResource())


urlpatterns = [
    # Examples:
    # url(r'^$', 'ology.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^_search/', 'ology.views.search', name='search'),
    url(r'^staff_api/', include(staff_api.urls)),
    url(r'^api/', include(v1_api.urls)),
    url(r'^redactor/', include('redactor.urls')),
    url(r'^category/(?P<category_id>\d+)/$', 'ology.views.index', name='category'),
    url(r'^category/(?P<category_id>\d+)/(?P<subcategory_id>\d+)/$', 'ology.views.index', name='subcategory'),
    url(r'^post/(?P<post_id>\d+)/$', 'ology.views.post', name='post'),
    url(r'^staff/', TemplateView.as_view(template_name='staff/index.html'), name='staff_view'),
    url(r'^search/$', TemplateView.as_view(template_name='search.html'), name='search_view'),
    url(r'^subscribe/$', TemplateView.as_view(template_name='subscribe.html'), name='subscribe'),
    url(r'^', 'ology.views.index', name='index'),


]
urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + urlpatterns
