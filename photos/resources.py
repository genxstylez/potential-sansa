# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tastypie.resources import ModelResource, fields, ALL_WITH_RELATIONS
from photos.models import Album, Photo
from tastypie.authentication import (ApiKeyAuthentication, BasicAuthentication,
                                     MultiAuthentication)
from tastypie.authorization import DjangoAuthorization
from ology.resources import MultipartResource


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
                'large': bundle.obj.img['large'].url,
                'xl': bundle.obj.img['xl'].url,
                'xxl': bundle.obj.img['xxl'].url
            }
            return bundle.data['img']


class AlbumResource(ModelResource):
    photos = fields.ToManyField(PhotoResource, 'photos', full=True, use_in='detail', null=True)
    cover = fields.ToOneField(PhotoResource,
                              lambda bundle: Photo.objects.filter(album=bundle.obj).first(),
                              use_in='list', full=True, null=True)

    class Meta:
        queryset = Album.objects.order_by('-created_at')
        resource_name = 'albums'
        list_allowed_methods = ['get', ]
        detailed_allowed_methods = ['get', ]
        filtering = {
            'published': ['exact']
        }


class AdminAlbumResource(ModelResource):

    class Meta:
        queryset = Album.objects.order_by('-created_at')
        resource_name = 'admin_albums'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post', 'put', 'delete', 'patch']
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        filtering = {
            'published': ['exact']
        }


class AdminPhotoResource(MultipartResource, ModelResource):
    album = fields.ForeignKey(AdminAlbumResource, 'album', full=True, null=True, blank=True)

    class Meta:
        queryset = Photo.objects.all()
        resource_name = 'admin_photos'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post', 'put', 'delete', 'patch']
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        filtering = {
            'album': ALL_WITH_RELATIONS
        }

    def dehydrate_img(self, bundle):
        if bundle.obj.img:
            bundle.data['img'] = {
                'original': bundle.obj.img.url,
                'small': bundle.obj.img['small'].url,
                'medium': bundle.obj.img['medium'].url,
                'large': bundle.obj.img['large'].url,
                'xl': bundle.obj.img['xl'].url,
                'xxl': bundle.obj.img['xxl'].url
            }
            return bundle.data['img']
