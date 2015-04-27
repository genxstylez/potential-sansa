# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0008_auto_20150427_1941'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='new_credits',
            new_name='credits',
        ),
    ]
