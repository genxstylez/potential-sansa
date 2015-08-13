# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0004_auto_20150528_0122'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='concept',
            field=models.TextField(null=True, verbose_name='\u6982\u5ff5', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='album',
            name='photographer',
            field=models.TextField(null=True, verbose_name='\u651d\u5f71', blank=True),
        ),
    ]
