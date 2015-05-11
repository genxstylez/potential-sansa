# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0012_auto_20150507_1845'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='is_shooting',
            field=models.BooleanField(default=False, db_index=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='post',
            name='tags',
            field=taggit.managers.TaggableManager(to='taggit.Tag', through='taggit.TaggedItem', blank=True, help_text='\u8acb\u7528\u9017\u865f(\u534a\u5f62)\u5728tag\u4e4b\u9593\u505a\u5340\u9694', verbose_name='Tags'),
        ),
    ]
