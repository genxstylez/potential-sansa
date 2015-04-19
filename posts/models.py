# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import watson

from django.db import models
from django.db.models.signals import post_save
from easy_thumbnails import fields


class Category(models.Model):
    name = models.CharField('標題', max_length=20)
    parent = models.ForeignKey('self', verbose_name='主類別', related_name='sub_categories', null=True, blank=True)

    def __unicode__(self):
        if self.parent:
            return '{} - {}'.format(self.parent, self.name)
        return self.name

    def to_json(self):
        return dict(
            name=self.name,
            parent=self.parent.to_json() if self.parent else None
        )


class Credit(models.Model):
    role = models.CharField('職稱', max_length=30)
    name = models.CharField('姓名', max_length=30)

    def __unicode__(self):
        return '{name} ({role})'.format(name=self.name, role=self.role)

    def to_json(self):
        return dict(
            role=self.role,
            name=self.name
        )


class Post(models.Model):
    slug = models.SlugField('slug', max_length=15)
    category = models.ForeignKey(Category, related_name='posts', verbose_name='類別')
    heading = models.CharField('主標題', max_length=30)
    subheading = models.CharField('副標題', max_length=30, blank=True)
    articletext = models.TextField('內容')
    credits = models.ManyToManyField(Credit, verbose_name='Credits')
    last_modified = models.DateTimeField('最後更改', auto_now=True)
    created_at = models.DateTimeField('建立時間', auto_now_add=True)
    starred = models.BooleanField('讚', default=False)
    published = models.BooleanField('發表', default=False)

    def __unicode__(self):
        return '({category}) - {heading}'.format(category=self.category, heading=self.heading)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.heading[:14]
        super(Post, self).save(*args, **kwargs)

    def to_json(self):
        return dict(
            slug=self.slug,
            category=self.category.to_json(),
            heading=self.heading,
            subheading=self.subheading,
            articletext=self.articletext,
            credits=[credit.to_json() for credit in self.credits.all()],
            images=[image.to_json() for image in self.images.all()],
        )


def post_image_path(instance, filename):
    return '{post}/{filename}'.format(post=instance.post, filename=filename)


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
            cover=self.is_cover,
            caption=self.caption,
            tag=self.tag,
            img=self.img.url
        )


def update_credit_index(instance, **kwargs):
    for credit in instance.credits.all():
        watson.default_search_engine.update_obj_index(credit)


def update_image_index(instance, **kwargs):
    for image in instance.images.all():
        watson.default_search_engine.update_obj_index(image)

post_save.connect(update_credit_index, Post)
post_save.connect(update_image_index, Post)
