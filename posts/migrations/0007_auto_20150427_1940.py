# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_auto_20150424_1803'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='new_credits',
            field=jsonfield.fields.JSONField(default={}, verbose_name='Credits'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='post',
            name='order',
            field=models.PositiveIntegerField(default=0, db_index=True),
        ),
    ]
