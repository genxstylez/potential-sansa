from django.contrib import admin
from posts.models import Category, Credit, Image, Post
from posts.forms import PostForm


class ImageInline(admin.TabularInline):
    model = Image


class PostAdmin(admin.ModelAdmin):
    form = PostForm
    inlines = [
        ImageInline,
    ]

admin.site.register(Post, PostAdmin)
admin.site.register(Category)
admin.site.register(Credit)
admin.site.register(Image)
