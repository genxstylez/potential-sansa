# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os
import uuid
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from posts.models import Image
from posts.forms import ImageForm
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from easy_thumbnails.files import get_thumbnailer


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

@csrf_exempt
def insert_post_images(request):
    image_file = request.FILES['file']
    def generate_filename():
        filename=str(uuid.uuid4())[:8]
        ext=image_file.name.split('.')[-1]
        file_name = filename + '.' + ext
        if default_storage.exists(file_name):
            return generate_filename()
        return os.path.join('post_images', file_name)
    with default_storage.open(generate_filename(), 'w') as destination:
        for chunk in image_file.chunks():
            destination.write(chunk)
    return HttpResponse()


def post_image_list(request):
    image_list = default_storage.listdir('post_images')[1]
    # image_list = filter(None, image_list)

    for image in image_list:
        if 'crop' in image or image == None:
            image_list.remove(image)

    images = [{
        'thumb' : get_thumbnailer('post_images/' + image).get_thumbnail({'crop': True, 'size': (100, 75)}, save=True).url,
        'image': default_storage.url('post_images/' + image),
        'title': os.path.basename(image)} for image in image_list]
    return JsonResponse(images, safe=False)


