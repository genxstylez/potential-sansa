# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tastypie.authentication import (ApiKeyAuthentication, BasicAuthentication,
                                     MultiAuthentication)
from tastypie.authorization import DjangoAuthorization
from tastypie.resources import ModelResource, fields, ALL_WITH_RELATIONS
from taggit.models import Tag
from posts.models import Category, Post, Image


class AdminCategoryResource(ModelResource):

    class Meta:
        queryset = Category.objects.all()
        resource_name = 'admin_posts'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post', 'put', 'delete']
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()


class AdminPostResource(ModelResource):

    class Meta:
        queryset = Post.objects.all()
        resource_name = 'admin_posts'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post', 'put', 'delete']
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()


class ImageResource(ModelResource):

    class Meta:
        queryset = Image.objects.all()
        resource_name = 'images'

    def dehydrate_img(self, bundle):
        bundle.data['img'] = {
            'original': bundle.obj.img.url,
            'small': bundle.obj.img['small'].url,
            'medium': bundle.obj.img['medium'].url,
            'large': bundle.obj.img['large'].url
        }
        return bundle.data['img']


class TagResource(ModelResource):

    class Meta:
        queryset = Tag.objects.all()


class CategoryResource(ModelResource):
    parent = fields.ForeignKey('self', 'parent', null=True, blank=True, full=True)

    class Meta:
        queryset = Category.objects.all()
        resource_name = 'category'
        allowed_methods = ['get']
        filtering = {
            'parent': ('isnull', 'exact')
        }


class StarredResource(ModelResource):
    cover = fields.ToManyField(ImageResource,
                               lambda bundle: Image.objects.filter(post=bundle.obj, is_cover=True),
                               use_in='list', full=True)

    class Meta:
        queryset = Post.objects.filter(starred=True, published=True).order_by('order')
        resource_name = 'starred'


class PostResource(ModelResource):
    category = fields.ForeignKey(CategoryResource, 'category', full=True, null=True, blank=True)
    credits = fields.DictField('credits', use_in='detail')
    tags = fields.ToManyField(TagResource, lambda bundle: bundle.obj.tags.all(), use_in='detail', full=True, null=True, blank=True)
    images = fields.ToManyField(ImageResource, 'images', full=True, use_in='detail')
    cover = fields.ToManyField(ImageResource,
                               lambda bundle: Image.objects.filter(post=bundle.obj, is_cover=True),
                               use_in='list', full=True)

    class Meta:
        queryset = Post.objects.filter(published=True).order_by('-created_at')
        resource_name = 'posts'
        list_allowed_methods = ['get', ]
        detailed_allowed_methods = ['get', ]
        filtering = {
            'category': ALL_WITH_RELATIONS,
        }