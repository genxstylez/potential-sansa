# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0020_auto_20150525_1937'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credit',
            name='post',
            field=models.ForeignKey(related_name='credits', to='posts.Post'),
        ),
    ]
