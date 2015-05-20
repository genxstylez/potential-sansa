# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from photos.models import Album, Photo
from photos.forms import PhotoForm


class PhotoInline(admin.TabularInline):
    model = Photo
    suit_classes = 'suit-tab suit-tab-photos'
    form = PhotoForm

    class Meta:
        verbose_name = ''


class AlbumAdmin(admin.ModelAdmin):
    model = Album
    date_hierarchy = 'created_at'
    inlines = [
        PhotoInline,
    ]
    search_fields = ['name', 'zh_name']

    fieldsets = (
        ('', {
            'classes': ('suit-tab', 'suit-tab-general'),
            'fields': ('name', 'zh_name', 'published')
        }),
        ('', {
            'classes': ('suit-tab', 'suit-tab-photos'),
            'fields': (),
        })
    )
    suit_form_tabs = (
        ('general', 'General'),
        ('photos', '圖片')
    )

admin.site.register(Album, AlbumAdmin)
