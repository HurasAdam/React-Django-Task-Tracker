from django.utils import timezone

from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

from .models import Project, Task, Comment, Attachment
from user.models import CustomUser


class ProjectSerializer(FlexFieldsModelSerializer, serializers.ModelSerializer):
    tags = serializers.ListField(source="tags.names", required=False)

    class Meta:
        model = Project
        fields = "__all__"
        # expandable_fields = {
        #     'owner': (UserSerializer, {'many': True})
        # }

    def validate_deadline(self, value):
        today = timezone.now()

        if value <= today:
            raise serializers.ValidationError(
                "The deadline must be set to a future date."
            )

        return value

    # def validate_owner(self, value):
    #     if isinstance(value, CustomUser):
    #         value = value.id
    #     try:
    #         user = CustomUser.objects.get(pk=value, is_active=True)
    #     except CustomUser.DoesNotExist:
    #         raise serializers.ValidationError(
    #             "Invalid owner. User does not exist or is not active."
    #         )

    #     return value


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["title", "description", "priority", "status", "owner", "assignees"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["text", "creator"]


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ["file"]


class DictionaryContentSerializer(serializers.Serializer):
    dictionary_name = serializers.CharField(max_length=255)
    content = serializers.DictField()