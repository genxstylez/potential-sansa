# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0010_auto_20150428_0350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='starred',
            field=models.BooleanField(default=False, verbose_name='\u52a0\u5165\u81f3\u6a6b\u5e45'),
        ),
    ]
