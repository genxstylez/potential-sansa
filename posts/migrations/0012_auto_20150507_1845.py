# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0011_auto_20150428_0528'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='credits',
            field=jsonfield.fields.JSONField(default={}, help_text='\nExample:<br>\n{<br>\n    "\u7de8\u8f2f": ["\u738b\u963f\u8c93", "Dog Chen", "Mr. Big"],<br>\n    "photography": ["\u5c0f\u53ee\u5679", "\u5927\u96c4"],<br>\n    "\u6821\u7a3f": "\u53ea\u6709\u4e00\u500b\u4eba"<br>\n}\n', verbose_name='Credits', blank=True),
        ),
    ]
