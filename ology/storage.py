from django.conf import settings
from storages.backends.s3boto import S3BotoStorage

ology_storage = S3BotoStorage(bucket=settings.AWS_STORAGE_BUCKET_NAME)
