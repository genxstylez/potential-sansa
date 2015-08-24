# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0027_post_is_select'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='select_text',
            field=models.TextField(null=True, verbose_name='\u55ae\u54c1\u6558\u8ff0', blank=True),
            preserve_default=True,
        ),
    ]
