# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tastypie.authentication import (ApiKeyAuthentication, BasicAuthentication,
                                     MultiAuthentication)
from tastypie.authorization import DjangoAuthorization
from tastypie.resources import ModelResource, fields, ALL_WITH_RELATIONS
from taggit.models import Tag
from posts.models import Category, Post, Image, Credit
from ology.resources import MultipartResource


class ImageResource(ModelResource):

    class Meta:
        queryset = Image.objects.order_by('-is_cover')
        resource_name = 'images'

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


class TagResource(ModelResource):

    class Meta:
        queryset = Tag.objects.all()


class CreditResource(ModelResource):

    class Meta:
        queryset = Credit.objects.all()


class CategoryResource(ModelResource):
    children = fields.ToManyField('self', lambda bundle: Category.objects.filter(parent=bundle.obj).order_by('order'),
                                  null=True, blank=True, full=True)

    class Meta:
        queryset = Category.objects.filter(parent__isnull=True).order_by('order')
        resource_name = 'category'
        allowed_methods = ['get']
        ordering = ['order', ]


class SubCategoryResource(ModelResource):
    parent = fields.ForeignKey('self', 'parent', null=True, blank=True, full=True)

    class Meta:
        queryset = Category.objects.all()
        resource_name = 'subcategory'
        allowed_methods = ['get']
        filtering = {
            'parent': ['isnull', 'exact'],
        }


class StarredResource(ModelResource):
    cover = fields.ToOneField(ImageResource,
                              lambda bundle: Image.objects.filter(post=bundle.obj, is_cover=True).first(),
                              use_in='list', full=True)

    class Meta:
        queryset = Post.objects.filter(starred=True, published=True).order_by('order')
        resource_name = 'starred'
        ordering = ['order', ]


class PostResource(ModelResource):
    category = fields.ForeignKey(SubCategoryResource, 'category', full=True, null=True, blank=True)
    credits = fields.ToManyField(CreditResource, lambda bundle: bundle.obj.credits.order_by('id'), full=True, use_in='detail', null=True, blank=True)
    tags = fields.ToManyField(TagResource, lambda bundle: bundle.obj.tags.all(), use_in='detail', full=True, null=True, blank=True)
    images = fields.ToManyField(ImageResource, lambda bundle: bundle.obj.images.order_by('-is_cover'), full=True, use_in='detail', null=True, blank=True)
    cover = fields.ToOneField(ImageResource,
                              lambda bundle: Image.objects.filter(post=bundle.obj, is_cover=True).first(),
                              use_in='list', full=True, null=True)

    class Meta:
        queryset = Post.objects.order_by('-id')
        resource_name = 'posts'
        list_allowed_methods = ['get', ]
        detailed_allowed_methods = ['get', ]
        filtering = {
            'category': ALL_WITH_RELATIONS,
            'published': ['exact'],
            'starred': ['exact']
        }


class AdminCategoryResource(ModelResource):
    children = fields.ToManyField('self', lambda bundle: Category.objects.filter(parent=bundle.obj).order_by('order'),
                                  null=True, blank=True, full=True)

    class Meta:
        queryset = Category.objects.filter(parent__isnull=True).order_by('order')
        resource_name = 'categories'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post', 'put', 'delete']
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()


class ExtraAdminCategoryResource(ModelResource):
    parent = fields.ForeignKey('self', 'parent', null=True, blank=True, full=True)

    class Meta:
        queryset = Category.objects.all()
        resource_name = 'admin_categories'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post', 'put', 'delete']
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()


class AdminPostResource(ModelResource):
    category = fields.ForeignKey(ExtraAdminCategoryResource, 'category', full=True, null=True, blank=True)

    class Meta:
        queryset = Post.objects.all()
        resource_name = 'admin_posts'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post', 'put', 'delete']
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()


class AdminCreditResource(ModelResource):
    post = fields.ForeignKey(AdminPostResource, 'post', full=True, null=True, blank=True)

    class Meta:
        queryset = Credit.objects.all()
        resource_name = 'admin_credits'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post', 'put', 'delete']
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()


class AdminImageResource(MultipartResource, ModelResource):
    post = fields.ForeignKey(AdminPostResource, 'post', full=True, null=True, blank=True)

    class Meta:
        queryset = Image.objects.order_by('-is_cover')
        resource_name = 'admin_images'
        list_allowed_methods = ['get', 'post']
        detailed_allowed_methods = ['get', 'post', 'put', 'delete', 'patch']
        authentication = MultiAuthentication(BasicAuthentication(), ApiKeyAuthentication())
        authorization = DjangoAuthorization()
        filtering = {
            'post': ALL_WITH_RELATIONS
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
