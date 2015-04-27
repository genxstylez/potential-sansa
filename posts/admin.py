# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from posts.models import Category, Image, Post
from posts.forms import PostForm, StarredPostForm

from suit.admin import SortableModelAdmin


class ImageInline(admin.TabularInline):
    model = Image
    suit_classes = 'suit-tab suit-tab-images'

    class Meta:
        verbose_name = ''


class PostAdmin(admin.ModelAdmin):
    form = PostForm
    list_filter = ('category', 'starred')
    date_hierarchy = 'created_at'
    inlines = [
        ImageInline,
    ]
    search_fields = ['heading', 'subheading']

    fieldsets = (
        ('', {
            'classes': ('suit-tab', 'suit-tab-general'),
            'fields': ('heading', 'subheading', 'category', 'credits', 'published', 'starred', 'tags')
        }),
        ('內容', {
            'classes': ('suit-tab', 'suit-tab-article', 'full-width',),
            'fields': ('articletext',)
        }),
        ('', {
            'classes': ('suit-tab', 'suit-tab-images'),
            'fields': (),
        })
    )
    suit_form_tabs = (
        ('general', 'General'),
        ('article', '內容'),
        ('images', '圖片')
    )


class StarredPost(Post):

    class Meta:
        proxy = True


class StarredAdmin(SortableModelAdmin):
    form = StarredPostForm
    list_filter = ('category',)
    sortable = 'order'
    inlines = [
        ImageInline,
    ]
    search_fields = ['heading', 'subheading']

    fieldsets = (
        ('', {
            'classes': ('suit-tab', 'suit-tab-general'),
            'fields': ('heading', 'subheading', 'category', 'credits', 'published', 'starred', 'tags')
        }),
        ('內容', {
            'classes': ('suit-tab', 'suit-tab-article', 'full-width',),
            'fields': ('articletext',)
        }),
        ('', {
            'classes': ('suit-tab', 'suit-tab-images'),
            'fields': (),
        })
    )
    suit_form_tabs = (
        ('general', 'General'),
        ('article', '內容'),
        ('images', '圖片')
    )

    def get_queryset(self, request):
        qs = super(StarredAdmin, self).get_queryset(request)
        return qs.filter(starred=True)


admin.site.register(Post, PostAdmin)
admin.site.register(StarredPost, StarredAdmin)
admin.site.register(Category)
admin.site.register(Image)
