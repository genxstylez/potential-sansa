from django.conf import settings
from storages.backends.s3boto import S3BotoStorage

DefaultStorage = lambda: S3BotoStorage(
    bucket=settings.AWS_MEDIA_STORAGE_BUCKET_NAME,
    custom_domain=settings.AWS_MEDIA_S3_CUSTOM_DOMAIN
)

StaticStorage = lambda: S3BotoStorage(bucket=settings.AWS_STATIC_STORAGE_BUCKET_NAME)
