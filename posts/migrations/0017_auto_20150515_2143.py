# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0016_auto_20150512_0504'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='zh_name',
            field=models.CharField(default='\u4e2d\u6587\u6a19\u984c', max_length=20, verbose_name='\u4e2d\u6587\u6a19\u984c'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='post',
            name='heading',
            field=models.CharField(help_text='\u82e5\u8981\u5206\u884c\u8acb\u8f38\u5165\r', max_length=30, verbose_name='\u4e3b\u6a19\u984c'),
        ),
    ]
