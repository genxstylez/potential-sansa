# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import posts.models
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0022_auto_20150525_1941'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='img',
            field=easy_thumbnails.fields.ThumbnailerImageField(help_text='\u6a6b\u5e45\u7167\u7247\u5c3a\u5bf8\u70ba 640x450', upload_to=posts.models.post_image_path, null=True, verbose_name='\u5716\u7247', blank=True),
        ),
    ]
