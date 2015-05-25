# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0019_auto_20150525_1920'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='credits',
        ),
        migrations.AlterField(
            model_name='credit',
            name='name',
            field=models.CharField(help_text='\u8907\u6578\u4eba\u6578\u8acb\u7528\u534a\u5f62, \u5206\u9694\u958b\u3002\u4f8b\u5982\uff1aAmber Chan, \u5c0f\u53ee\u5679', max_length=255),
        ),
    ]
