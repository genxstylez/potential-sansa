# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import photos.models
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name='\u82f1\u6587\u6a19\u984c')),
                ('zh_name', models.CharField(max_length=20, verbose_name='\u4e2d\u6587\u6a19\u984c', blank=True)),
                ('last_modified', models.DateTimeField(auto_now=True, verbose_name='\u6700\u5f8c\u66f4\u6539')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='\u5efa\u7acb\u6642\u9593')),
                ('published', models.BooleanField(default=False, verbose_name='\u767c\u8868')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('img', easy_thumbnails.fields.ThumbnailerImageField(upload_to=photos.models.album_image_path, verbose_name='\u5716\u7247')),
                ('album', models.ForeignKey(related_name='photos', verbose_name='\u76f8\u7c3f', to='photos.Album')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
