# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import watson
import uuid
import urlparse

from django.db import models
from django.db.models.signals import post_save
from django.core.urlresolvers import reverse
from taggit.managers import TaggableManager
from easy_thumbnails import fields
from autoslug import AutoSlugField


class Category(models.Model):
    name = models.CharField('標題', max_length=20)
    zh_name = models.CharField('中文標題', max_length=20)
    parent = models.ForeignKey('self', verbose_name='主類別', related_name='sub_categories', null=True, blank=True)
    order = models.PositiveIntegerField(db_index=True, default=0)

    def __unicode__(self):
        if self.parent:
            return '{} - {}'.format(self.parent, self.name)
        return self.name

    def to_json(self):
        return dict(
            id=self.id,
            name=self.name,
            parent=self.parent.to_json() if self.parent else None
        )

    def get_absolute_url(self):
        if self.parent is None:
            return reverse('category', args=(self.id,))
        return reverse('subcategory', args=(self.parent.id, self.id))


class Post(models.Model):
    slug = AutoSlugField(populate_from=lambda instance: instance.heading,
                         unique_with=['category__name', 'created_at__month'],
                         slugify=lambda value: value.replace(' ', '-'), db_index=True)
    category = models.ForeignKey(Category, related_name='posts', verbose_name='類別')
    heading = models.CharField('主標題', max_length=30, help_text="若要分行請輸入\r")
    subheading = models.CharField('副標題', max_length=30, blank=True)
    articletext = models.TextField('內容')
    last_modified = models.DateTimeField('最後更改', auto_now=True)
    created_at = models.DateTimeField('建立時間', auto_now_add=True)
    starred = models.BooleanField('加入至橫幅', default=False)
    published = models.BooleanField('發表', default=False)
    order = models.PositiveIntegerField(db_index=True, default=0)
    tags = TaggableManager(help_text='請用逗號(半形)在tag之間做區隔', blank=True)
    is_shooting = models.BooleanField(default=False, db_index=True)

    def __unicode__(self):
        if self.subheading:
            return '({category}) - {heading} - {subheading}'.format(
                category=self.category,
                heading=self.heading,
                subheading=self.subheading)
        return '({category}) - {heading}'.format(category=self.category, heading=self.heading)

    def save(self, *args, **kwargs):
        self.is_shooting = self.category.name.lower() in ['shooting']
        super(Post, self).save(*args, **kwargs)

    def get_cover(self):
        image = self.images.filter(is_cover=True).first()
        return image

    def to_json(self):
        cover_image = self.images.filter(is_cover=True).first()
        return dict(
            id=self.id,
            slug=self.slug,
            category=self.category.to_json(),
            heading=self.heading,
            subheading=self.subheading,
            articletext=self.articletext,
            last_modified=str(self.last_modified),
            created_at=str(self.created_at),
            credits=[credit.to_json() for credit in self.credits.all()],
            images=[image.to_json() for image in self.images.all()],
            cover=dict(
                img=dict(
                    original=cover_image.img.url,
                    small=cover_image.img['small'].url,
                    medium=cover_image.img['medium'].url,
                    large=cover_image.img['large'].url,
                )
            )
        )


def post_image_path(instance, filename):
    return '{post}/{filename}.{ext}'.format(post=instance.post, filename=str(uuid.uuid4())[:8], ext=filename.split('.')[-1])


class Credit(models.Model):
    post = models.ForeignKey(Post, related_name='credits')
    role = models.CharField('職稱', max_length=50)
    name = models.CharField('姓名', max_length=255, help_text='複數人數請用半形, 分隔開。例如：Amber Chan, 小叮噹')

    def to_json(self):
        return dict(
            role=self.role,
            name=self.name
        )


class Image(models.Model):
    post = models.ForeignKey(Post, related_name='images', verbose_name='文章')
    is_cover = models.BooleanField('封面照片', default=False)
    caption = models.CharField('註解', blank=True, max_length=50)
    tag = models.CharField('書籤位置', blank=True, max_length=50)
    img = fields.ThumbnailerImageField('圖片', upload_to=post_image_path, null=True, blank=True,
                                       help_text='橫幅照片尺寸為 640x450')
    video_url = models.CharField('Youtube 網址', max_length=255, blank=True, default='')
    video_id = models.CharField('Youtube ID', max_length=40, editable=False, blank=True, default='')

    def save(self, *args, **kwargs):
        if self.video_url:
            url_obj = urlparse.urlparse(self.video_url)
            if url_obj.netloc.lower() == 'www.youtube.com':
                self.video_id = urlparse.parse_qs(url_obj.query)['v'][0]
            elif url_obj.netloc.lower() == 'youtu.be':
                self.video_id = url_obj.path.strip('/')
        else:
            if self.video_id:
                self.video_id = ''
        super(Image, self).save(*args, **kwargs)

    def __unicode__(self):
        return '{post} - {id}'.format(post=self.post, id=self.id)

    def to_json(self):
        return dict(
            id=self.id,
            cover=self.is_cover,
            caption=self.caption,
            tag=self.tag,
            img=self.img.url if self.img else '',
            video_id=self.video_id
        )

    def generate_video_embed(self, width=600, height=450):
        return '<iframe width="{width}" height="{height}" ' \
            'src="https://www.youtube.com/embed/{video_id}" ' \
            'frameborder="0" allowfullscreen></iframe>'.format(
                width=width,
                height=height,
                video_id=self.video_id
            )


class StarredPost(Post):

    class Meta:
        proxy = True


def update_category_order(instance, created, **kwargs):
    if created:
        instance.order = 0
        for category in Category.objects.all():
            category.order += 1
            category.save()
        instance.save()


def update_starredpost_order(instance, created, **kwargs):
    if created:
        instance.order = 0
        for post in Post.objects.filter(starred=True):
            post.order += 1
            post.save()
        instance.save()


def update_image_index(instance, **kwargs):
    for image in instance.images.all():
        watson.default_search_engine.update_obj_index(image)


def update_credit_index(instance, **kwargs):
    for credit in instance.credits.all():
        watson.default_search_engine.update_obj_index(credit)

# post_save.connect(update_image_index, Post)
# post_save.connect(update_credit_index, Post)
post_save.connect(update_category_order, Category)
post_save.connect(update_starredpost_order, StarredPost)
