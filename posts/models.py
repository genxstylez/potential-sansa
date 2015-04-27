# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import watson
import uuid

from django.db import models
from django.db.models.signals import post_save
from taggit.managers import TaggableManager
from easy_thumbnails import fields
from jsonfield import JSONField
from autoslug import AutoSlugField


class Category(models.Model):
    name = models.CharField('標題', max_length=20)
    parent = models.ForeignKey('self', verbose_name='主類別', related_name='sub_categories', null=True, blank=True)

    def __unicode__(self):
        if self.parent:
            return '{} - {}'.format(self.parent, self.name)
        return self.name

    def to_json(self):
        return dict(
            id=self.id,
            name=self.name,
            parent=self.parent.to_json() if self.parent else None
        )


class Post(models.Model):
    slug = AutoSlugField(populate_from=lambda instance: instance.heading,
                         unique_with=['category__name', 'created_at__month'],
                         slugify=lambda value: value.replace(' ', '-'), db_index=True)
    category = models.ForeignKey(Category, related_name='posts', verbose_name='類別')
    heading = models.CharField('主標題', max_length=30)
    subheading = models.CharField('副標題', max_length=30, blank=True)
    articletext = models.TextField('內容')
    credits = JSONField('Credits', default={})
    last_modified = models.DateTimeField('最後更改', auto_now=True)
    created_at = models.DateTimeField('建立時間', auto_now_add=True)
    starred = models.BooleanField('加入至橫幅', default=False)
    published = models.BooleanField('發表', default=False)
    order = models.PositiveIntegerField(db_index=True, default=0)
    tags = TaggableManager(help_text='請用逗號在tag之間做區隔', blank=True)

    def __unicode__(self):
        return '({category}) - {heading}'.format(category=self.category, heading=self.heading)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.heading[:14]
        super(Post, self).save(*args, **kwargs)

    def to_json(self):
        return dict(
            id=self.id,
            slug=self.slug,
            category=self.category.to_json(),
            heading=self.heading,
            subheading=self.subheading,
            articletext=self.articletext,
            last_modified=str(self.last_modified),
            created_at=str(self.created_at),
            credits=dict(self.credits),
            images=[image.to_json() for image in self.images.all()],
            cover=dict(
                img=dict(
                    original=self.images.filter(is_cover=True)[0].img.url,
                    small=self.images.filter(is_cover=True)[0].img['small'].url,
                    medium=self.images.filter(is_cover=True)[0].img['medium'].url,
                    large=self.images.filter(is_cover=True)[0].img['large'].url,
                )
            )
        )


def post_image_path(instance, filename):
    return '{post}/{filename}.{ext}'.format(post=instance.post, filename=str(uuid.uuid4())[:8], ext=filename.split('.')[-1])


class Image(models.Model):
    post = models.ForeignKey(Post, related_name='images', verbose_name='文章')
    is_cover = models.BooleanField('封面照片', default=False)
    caption = models.CharField('註解', blank=True, max_length=50)
    tag = models.CharField('書籤位置', blank=True, max_length=50)
    img = fields.ThumbnailerImageField('圖片', upload_to=post_image_path)

    def __unicode__(self):
        return '{post} - {id}'.format(post=self.post, id=self.id)

    def to_json(self):
        return dict(
            id=self.id,
            cover=self.is_cover,
            caption=self.caption,
            tag=self.tag,
            img=self.img.url
        )


def update_image_index(instance, **kwargs):
    for image in instance.images.all():
        watson.default_search_engine.update_obj_index(image)

post_save.connect(update_image_index, Post)
