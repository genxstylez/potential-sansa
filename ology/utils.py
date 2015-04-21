# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.urlresolvers import reverse as django_reverse


def reverse(viewname, urlconf=None, args=None, kwargs=None, prefix=None, current_app=None, query_kwargs=None):
    """
    Wrapper of django.core.urlresolvers.reverse that attaches arguments in kwargs as query string parameters
    """
    if query_kwargs:
        return '%s?%s' % (django_reverse(viewname, urlconf, args, None, prefix, current_app),
                          '&'.join(['%s=%s' % (k, v) for k, v in query_kwargs.items()]))
    else:
        return django_reverse(viewname, urlconf, args, kwargs, prefix, current_app)
