from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render, redirect
from django.forms.models import modelformset_factory
from posts.forms import PostForm
from posts.models import Image


@staff_member_required
def add(request):
    form = PostForm(request.POST or None)
    if form.is_valid():
        post = form.save()
        return redirect('post-attach-img', post.id)
    return render(request, 'posts/form.html', {'form': form})


@staff_member_required
def edit(request):
    form = PostForm(request.POST or None)
    if form.is_valid():
        post = form.save()
        return redirect('post-attach-img', post.id)
    return render(request, 'posts/form.html', {'form': form})


@staff_member_required
def attach_img(request, post_id):
    image_formset = modelformset_factory(Image, fields=('caption', 'img', 'tag'))
    pass

