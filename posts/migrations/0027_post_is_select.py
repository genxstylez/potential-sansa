# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0026_auto_20150709_0310'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='is_select',
            field=models.BooleanField(default=False, db_index=True),
            preserve_default=True,
        ),
    ]
