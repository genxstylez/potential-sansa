# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('name', models.CharField(verbose_name='標題', max_length=20)),
                ('parent', models.ForeignKey(to='posts.Category', null=True, related_name='sub_categories')),
            ],
        ),
        migrations.CreateModel(
            name='Credit',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('role', models.CharField(verbose_name='職稱', max_length=30)),
                ('name', models.CharField(verbose_name='姓名', max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('is_cover', models.BooleanField(verbose_name='封面照片', default=False)),
                ('caption', models.CharField(blank=True, verbose_name='註解', max_length=50)),
                ('tag', models.CharField(blank=True, verbose_name='書籤位置', max_length=50)),
                ('img', models.ImageField(verbose_name='圖片', upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('zh_title', models.CharField(verbose_name='中文標題', max_length=30)),
                ('slug', models.SlugField(verbose_name='slug', max_length=15)),
                ('en_title', models.CharField(blank=True, verbose_name='英文標題', max_length=30)),
                ('content', models.TextField(verbose_name='內容')),
                ('last_modified', models.DateTimeField(verbose_name='最後更改', auto_now=True)),
                ('created_at', models.DateTimeField(verbose_name='建立時間', auto_now_add=True)),
                ('category', models.ForeignKey(to='posts.Category', verbose_name='類別', related_name='posts')),
                ('credits', models.ManyToManyField(verbose_name='Credits', to='posts.Credit')),
            ],
        ),
        migrations.AddField(
            model_name='image',
            name='post',
            field=models.ForeignKey(to='posts.Post', verbose_name='文章', related_name='images'),
        ),
    ]
