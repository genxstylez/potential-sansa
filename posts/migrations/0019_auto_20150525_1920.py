# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0018_credit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credit',
            name='post',
            field=models.ForeignKey(related_name='new_credits', to='posts.Post'),
        ),
    ]
