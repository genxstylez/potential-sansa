# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import posts.models
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_post_starred'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='content',
            new_name='articletext',
        ),
        migrations.AlterField(
            model_name='category',
            name='parent',
            field=models.ForeignKey(related_name='sub_categories', verbose_name='\u4e3b\u985e\u5225', blank=True, to='posts.Category', null=True),
        ),
        migrations.AlterField(
            model_name='image',
            name='img',
            field=easy_thumbnails.fields.ThumbnailerImageField(upload_to=posts.models.post_image_path, verbose_name='\u5716\u7247'),
        ),
    ]
