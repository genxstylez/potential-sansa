from django.conf import settings


def js_debug(request):
    return {
        'JS_DEBUG': settings.JS_DEBUG if hasattr(settings, 'JS_DEBUG') else False
    }
