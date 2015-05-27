# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0003_photo_photographer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='photographer',
        ),
        migrations.AddField(
            model_name='album',
            name='photographer',
            field=models.TextField(default='test', verbose_name='\u651d\u5f71', blank=True),
            preserve_default=False,
        ),
    ]
