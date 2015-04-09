# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Category(models.Model):
    name = models.CharField('標題', max_length=20)
    parent = models.ForeignKey('self', verbose_name='主類別', related_name='sub_categories', null=True, blank=True)

    def __unicode__(self):
        if self.parent:
            return '{} - {}'.format(self.parent, self.name)
        return self.name


class Credit(models.Model):
    role = models.CharField('職稱', max_length=30)
    name = models.CharField('姓名', max_length=30)

    def __unicode__(self):
        return '{name} ({role})'.format(name=self.name, role=self.role)


class Post(models.Model):
    slug = models.SlugField('slug', max_length=15)
    category = models.ForeignKey(Category, related_name='posts', verbose_name='類別')
    zh_title = models.CharField('中文標題', max_length=30)
    en_title = models.CharField('英文標題', max_length=30, blank=True)
    content = models.TextField('內容')
    credits = models.ManyToManyField(Credit, verbose_name='Credits')
    last_modified = models.DateTimeField('最後更改', auto_now=True)
    created_at = models.DateTimeField('建立時間', auto_now_add=True)
    starred = models.BooleanField('讚', default=False)
    published = models.BooleanField('發表', default=False)

    def __unicode__(self):
        return '({category}) - {title}'.format(category=self.category, title=self.zh_title)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.zh_title[:14]
        super(Post, self).save(*args, **kwargs)


class Image(models.Model):

    def post_image_path(self, filename):
        import uuid
        return '{post}/{caption}'.format(post=self.post, caption=self.caption or unicode(uuid.uuid4())[:6])

    post = models.ForeignKey(Post, related_name='images', verbose_name='文章')
    is_cover = models.BooleanField('封面照片', default=False)
    caption = models.CharField('註解', blank=True, max_length=50)
    tag = models.CharField('書籤位置', blank=True, max_length=50)
    img = models.ImageField('圖片', upload_to=post_image_path)

    def __unicode__(self):
        return '{post} - {id}'.format(post=self.post, id=self.id)
