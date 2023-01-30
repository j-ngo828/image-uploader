from rest_framework import serializers

from .models import ImageUpload


class ImageUploadSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.ImageField()

    def create(self, validated_data):
        return ImageUpload.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.image = validated_data.get("image", instance.image)
        instance.save()
        return instance

    # class Meta:
    #     model = ImageUpload
    #     fields = ['image']


# {"image":"image field"}
