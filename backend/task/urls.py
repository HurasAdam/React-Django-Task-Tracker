from rest_framework.routers import DefaultRouter
from django.urls import re_path
from django.urls.conf import include

from .viewsets import ProjectViewSet, TaskViewSet, CommentViewSet, AttachmentViewSet


project_router = DefaultRouter()
task_router = DefaultRouter()
comment_router = DefaultRouter()
attachment_router = DefaultRouter()

project_router.register(
    r"",
    ProjectViewSet,
)

task_router.register(
    r"",
    TaskViewSet,
)

comment_router.register(
    r"",
    CommentViewSet,
)

attachment_router.register(
    r"",
    AttachmentViewSet,
)


urlpatterns = [
     re_path(r"projects/", include(project_router.urls)),
     re_path(r"tasks/", include(task_router.urls)),
     re_path(r"comments/", include(comment_router.urls)),
     re_path(r"attachments/", include(attachment_router.urls)),
]
