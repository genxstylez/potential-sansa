# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.http import JsonResponse, HttpResponse
import watson

from posts.models import Image, Credit, Post


def search(request):
    q = request.GET.get('q', '')
    watson_results = watson.search(q)
    show_only_post_results = []
    for result in watson_results:
        if isinstance(result.object, Image):
            post = result.object.post
            show_only_post_results.append(post)
        elif isinstance(result.object, Post):
            post = result.object
            show_only_post_results.append(post)
        elif isinstance(result.object, Credit):
            for post in result.object.post_set.filter(published=True):
                show_only_post_results.append(post)
    objects = [post.to_json() for post in list(set(show_only_post_results))]
    meta = {'count': len(objects), 'keyword': q}
    response = {'meta': meta, 'objects': objects}

    return HttpResponse(json.dumps(response), content_type='application/json')
