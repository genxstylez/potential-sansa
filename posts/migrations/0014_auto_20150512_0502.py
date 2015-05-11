# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0013_auto_20150511_1751'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='video_id',
            field=models.CharField(default='', verbose_name='Youtube ID', max_length=40, editable=False, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='image',
            name='video_url',
            field=models.CharField(default='', max_length=255, verbose_name='Youtube \u7db2\u5740', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='image',
            name='caption',
            field=models.CharField(max_length=25, verbose_name='\u8a3b\u89e3', blank=True),
        ),
    ]
