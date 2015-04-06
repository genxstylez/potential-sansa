from django.conf.urls import patterns, url


urlpatterns = patterns('posts.views',
    url(r'^add/$', 'add', name='post-add'),
    url(r'^edit/$', 'edit', name='post-edit'),
)
