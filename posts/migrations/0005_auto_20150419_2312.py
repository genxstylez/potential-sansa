# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20150419_2311'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='zh_title',
            new_name='heading',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='en_title',
            new_name='subheading',
        ),
    ]
