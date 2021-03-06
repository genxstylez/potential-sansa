# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from posts.models import Category, Image, Post, Credit, StarredPost
from posts.forms import PostForm, StarredPostForm

from suit.admin import SortableModelAdmin


class ImageInline(admin.TabularInline):
    model = Image
    suit_classes = 'suit-tab suit-tab-images'
    fields = ('caption', 'img', 'video_url', 'tag', 'is_cover')

    class Meta:
        verbose_name = ''


class CreditInline(admin.TabularInline):
    model = Credit
    suit_classes = 'suit-tab suit-tab-credits'


class PostAdmin(admin.ModelAdmin):
    form = PostForm
    list_filter = ('category', 'starred')
    date_hierarchy = 'created_at'
    inlines = [
        ImageInline,
        CreditInline,
    ]
    search_fields = ['heading', 'subheading']

    fieldsets = (
        ('', {
            'classes': ('suit-tab', 'suit-tab-general'),
            'fields': ('heading', 'subheading', 'category', 'published', 'starred', 'tags')
        }),
        ('內容', {
            'classes': ('suit-tab', 'suit-tab-article', 'full-width',),
            'fields': ('articletext',)
        }),
        ('', {
            'classes': ('suit-tab', 'suit-tab-images'),
            'fields': (),
        }),
        ('', {
            'classes': ('suit-tab', 'suit-tab-credits'),
            'fields': (),
        }),
    )
    suit_form_tabs = (
        ('general', 'General'),
        ('article', '內容'),
        ('images', '圖片'),
        ('credits', 'Credits')
    )

    class Media:
        css = {
            'all': ("//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css",)
        }


class StarredAdmin(SortableModelAdmin):
    form = StarredPostForm
    list_filter = ('category',)
    sortable = 'order'
    inlines = [
        ImageInline,
        CreditInline
    ]
    search_fields = ['heading', 'subheading']

    fieldsets = (
        ('', {
            'classes': ('suit-tab', 'suit-tab-general'),
            'fields': ('heading', 'subheading', 'category', 'published', 'starred', 'tags')
        }),
        ('內容', {
            'classes': ('suit-tab', 'suit-tab-article', 'full-width',),
            'fields': ('articletext',)
        }),
        ('', {
            'classes': ('suit-tab', 'suit-tab-images'),
            'fields': (),
        }),
        ('', {
            'classes': ('suit-tab', 'suit-tab-credits'),
            'fields': (),
        }),
    )
    suit_form_tabs = (
        ('general', 'General'),
        ('article', '內容'),
        ('images', '圖片'),
        ('credits', 'Credits')
    )

    def get_queryset(self, request):
        qs = super(StarredAdmin, self).get_queryset(request)
        return qs.filter(starred=True)


class CategoryAdmin(SortableModelAdmin):
    model = Category
    sortable = 'order'


admin.site.register(Post, PostAdmin)
admin.site.register(StarredPost, StarredAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Image)
admin.site.register(Credit)
