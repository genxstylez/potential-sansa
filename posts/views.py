# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from posts.models import Image
from posts.forms import ImageForm
from django.http import HttpResponse, HttpResponseBadRequest


def image_edit(request):
    if request.POST['id']:
        image = Image.objects.get(id=request.POST['id'])
        form = ImageForm(request.POST, instance=image)
        if form.is_valid():
            image = form.save()
            return HttpResponse(status=204)
    return HttpResponseBadRequest()


def set_cover(request):
    if all(key in request.POST for key in ['id', 'post_id']):
        image = Image.objects.get(id=request.POST['id'])
        Image.objects.filter(post=request.POST['post_id']).exclude(id=request.POST['id']).update(is_cover=False)
        image.is_cover = True
        image.save()
        return HttpResponse(status=204)
    return HttpResponseBadRequest()


def image_delete(request):
    if request.POST['id']:
        image = Image.objects.get(id=request.POST['id'])
        image.delete()
        return HttpResponse()
    return HttpResponseBadRequest()
