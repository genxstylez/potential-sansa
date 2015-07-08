# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.http import HttpResponse
from django.shortcuts import render
from ology.utils import reverse
import watson

from posts.models import Image, Post, Credit, Category


def index(request, category_id=None, subcategory_id=None):
    categories = Category.objects.filter(parent__isnull=True).order_by('order')
    if subcategory_id:
        posts = Post.objects.filter(published=True, category=subcategory_id).order_by('-created_at')[:50]
    elif category_id:
        posts = Post.objects.filter(published=True, category=category_id).order_by('-created_at')[:50]
    else:
        posts = Post.objects.filter(published=True).order_by('-created_at')[:50]
    starred_posts = Post.objects.filter(starred=True, published=True).order_by('order')
    return render(request, 'index.html', {'categories': categories, 'posts': posts, 'starred_posts': starred_posts})


def post(request, post_id):
    post = Post.objects.get(id=post_id)
    share_url = 'https://www.facebook.com/sharer/sharer.php?u' + request.build_absolute_uri() + '&title' + post.heading
    return render(request, 'post.html', {'post': post, 'share_url': share_url})


def search(request):
    q = request.GET.get('q', '')
    offset = request.GET.get('offset', 0)
    limit = request.GET.get('limit', 20)
    next_offset = offset + limit
    previous_offset = offset - limit
    watson_results = watson.search(q)
    show_only_post_results = []
    for result in watson_results:
        if isinstance(result.object, Image):
            post = result.object.post
        elif isinstance(result.object, Post):
            post = result.object
        elif isinstance(result.object, Credit):
            post = result.object.post
        show_only_post_results.append(post)
    objects = [this_post.to_json() for this_post in list(set(show_only_post_results))]

    paginated_objects = objects[offset: offset + limit]
    has_next_page = len(objects[next_offset:]) > 0
    has_previous_page = previous_offset >= 0
    next_page = None
    previous_page = None
    if has_next_page:
        next_page = reverse('search', query_kwargs={'limit': limit, 'offset': next_offset, 'q': q})
    if has_previous_page:
        previous_page = reverse('search', query_kwargs={'limit': limit, 'offset': previous_offset, 'q': q})
    meta = {
        'count': len(objects),
        'next': next_page,
        'previous': previous_page,
        'keyword': q
    }
    response = {'meta': meta, 'objects': paginated_objects}

    return HttpResponse(json.dumps(response), content_type='application/json')
