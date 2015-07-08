# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0025_auto_20150707_1546'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='articletext',
            field=models.TextField(help_text='\u82e5\u8981\u63db\u884c\u8acb\u8f38\u5165shift+enter, \u5206\u6bb5\u843d\u8acb\u8f38\u5165enter', verbose_name='\u5167\u5bb9'),
        ),
        migrations.AlterField(
            model_name='post',
            name='heading',
            field=models.CharField(max_length=30, verbose_name='\u4e3b\u6a19\u984c'),
        ),
    ]
