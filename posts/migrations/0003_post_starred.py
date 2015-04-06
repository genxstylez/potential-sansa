# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20150405_1554'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='starred',
            field=models.BooleanField(default=False, verbose_name='\u8b9a'),
            preserve_default=True,
        ),
    ]
