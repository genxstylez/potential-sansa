# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from photos.models import Photo
from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import get_object_or_404


def photo_edit(request):
    if request.POST['id']:
        photo = get_object_or_404(Photo, id=request.POST['id'])
        if request.POST['caption']:
            photo.caption = request.POST['caption']
            photo.save()
            return HttpResponse(status=204)
    return HttpResponseBadRequest()


def photo_delete(request):
    if request.POST['id']:
        photo = get_object_or_404(Photo, id=request.POST['id'])
        photo.delete()
        return HttpResponse()
    return HttpResponseBadRequest()
