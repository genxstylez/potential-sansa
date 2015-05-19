# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='caption',
            field=models.CharField(default='aa', max_length=20, verbose_name='\u8a3b\u89e3', blank=True),
            preserve_default=False,
        ),
    ]
