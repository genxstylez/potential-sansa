# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import posts.models
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0015_auto_20150512_0504'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='img',
            field=easy_thumbnails.fields.ThumbnailerImageField(upload_to=posts.models.post_image_path, null=True, verbose_name='\u5716\u7247', blank=True),
        ),
    ]
