# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tastypie.resources import ModelResource, fields
from photos.models import Album, Photo


class PhotoResource(ModelResource):

    class Meta:
        queryset = Photo.objects.all()
        resource_name = 'photos'

    def dehydrate_img(self, bundle):
        if bundle.obj.img:
            bundle.data['img'] = {
                'original': bundle.obj.img.url,
                'small': bundle.obj.img['small'].url,
                'medium': bundle.obj.img['medium'].url,
                'large': bundle.obj.img['large'].url
            }
            return bundle.data['img']


class AlbumResource(ModelResource):
    photos = fields.ToManyField(PhotoResource, 'photos', full=True, use_in='detail')
    cover = fields.ToOneField(PhotoResource,
                              lambda bundle: Photo.objects.filter(album=bundle.obj).first(),
                              use_in='list', full=True)

    class Meta:
        queryset = Album.objects.filter(published=True).order_by('-created_at')
        resource_name = 'albums'
        list_allowed_methods = ['get', ]
        detailed_allowed_methods = ['get', ]
