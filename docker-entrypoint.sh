#!/bin/bash

if [ "$1" = 'gunicorn' ]; then
    echo Starting Gunicorn.
    python manage.py migrate --noinput        # Apply database migrations
    python manage.py collectstatic --noinput  # Collect static files
fi

exec "$@"