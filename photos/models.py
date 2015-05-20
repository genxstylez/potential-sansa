# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import uuid

from django.db import models
from easy_thumbnails import fields


class Album(models.Model):
    name = models.CharField('英文標題', max_length=20)
    zh_name = models.CharField('中文標題', max_length=20, blank=True)
    last_modified = models.DateTimeField('最後更改', auto_now=True)
    created_at = models.DateTimeField('建立時間', auto_now_add=True)
    published = models.BooleanField('發表', default=False)

    def __unicode__(self):
        return self.name


def album_image_path(instance, filename):
    return '{album}/{filename}.{ext}'.format(album=instance.album, filename=str(uuid.uuid4())[:8], ext=filename.split('.')[-1])


class Photo(models.Model):
    album = models.ForeignKey(Album, verbose_name='相簿', related_name='photos')
    caption = models.CharField('註解', max_length=20, blank=True)
    img = fields.ThumbnailerImageField('圖片', upload_to=album_image_path)
    photographer = models.TextField('攝影', blank=True)
