from rest_framework import viewsets

# from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser

from .models import ImageUpload
from .serializers import ImageUploadSerializer

# Create your views here.


class ImageUploadViewSet(viewsets.ModelViewSet):
    serializer_class = ImageUploadSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        return ImageUpload.objects.all()
