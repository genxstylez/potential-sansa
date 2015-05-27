# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from photos.models import Album, Photo
from photos.forms import AlbumForm


class PhotoInline(admin.TabularInline):
    model = Photo
    suit_classes = 'suit-tab suit-tab-photos'

    class Meta:
        verbose_name = ''


class AlbumAdmin(admin.ModelAdmin):
    model = Album
    date_hierarchy = 'created_at'
    form = AlbumForm
    inlines = [
        PhotoInline,
    ]
    search_fields = ['name', 'zh_name']

    fieldsets = (
        ('', {
            'classes': ('suit-tab', 'suit-tab-general'),
            'fields': ('name', 'zh_name', 'published')
        }),
        ('攝影', {
            'classes': ('suit-tab', 'suit-tab-photographer', 'full-width',),
            'fields': ('photographer',)
        }),
        ('', {
            'classes': ('suit-tab', 'suit-tab-photos'),
            'fields': (),
        })
    )
    suit_form_tabs = (
        ('general', 'General'),
        ('photographer', '攝影'),
        ('photos', '圖片')
    )

    class Media:
        css = {
            'all': ("//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css",)
        }

admin.site.register(Album, AlbumAdmin)
