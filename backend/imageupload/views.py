from rest_framework import viewsets

# from rest_framework import permissions
from rest_framework.parsers import FormParser, MultiPartParser

from .models import ImageUpload
from .serializers import ImageUploadSerializer

# Create your views here.


class ImageUploadViewSet(viewsets.ModelViewSet):
    queryset = ImageUpload.objects.all()
    serializer_class = ImageUploadSerializer
    parser_classes = (MultiPartParser, FormParser)
