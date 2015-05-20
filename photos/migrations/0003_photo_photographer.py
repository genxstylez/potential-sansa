# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0002_photo_caption'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='photographer',
            field=models.TextField(default='someone famous', verbose_name='\u651d\u5f71', blank=True),
            preserve_default=False,
        ),
    ]
