# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0017_auto_20150515_2143'),
    ]

    operations = [
        migrations.CreateModel(
            name='Credit',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('role', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=255)),
                ('post', models.ForeignKey(to='posts.Post')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
