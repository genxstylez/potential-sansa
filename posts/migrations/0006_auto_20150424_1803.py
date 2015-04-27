# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0001_initial'),
        ('posts', '0005_auto_20150419_2312'),
    ]

    operations = [
        migrations.CreateModel(
            name='StarredPost',
            fields=[
            ],
            options={
                'proxy': True,
            },
            bases=('posts.post',),
        ),
        migrations.AddField(
            model_name='post',
            name='order',
            field=models.PositiveIntegerField(default=0, editable=False, db_index=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='post',
            name='tags',
            field=taggit.managers.TaggableManager(to='taggit.Tag', through='taggit.TaggedItem', blank=True, help_text='\u8acb\u7528\u9017\u865f\u5728tag\u4e4b\u9593\u505a\u5340\u9694', verbose_name='Tags'),
            preserve_default=True,
        ),
    ]
