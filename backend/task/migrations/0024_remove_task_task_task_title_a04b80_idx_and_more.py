# Generated by Django 5.0.1 on 2024-02-15 21:02

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            "task",
            "0023_rename_task_task_title_f93335_idx_task_task_title_a04b80_idx_and_more",
        ),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name="task",
            name="task_task_title_a04b80_idx",
        ),
        migrations.RemoveField(
            model_name="task",
            name="owner",
        ),
        migrations.AddIndex(
            model_name="task",
            index=models.Index(
                fields=["title", "project", "priority", "status"],
                name="task_task_title_05550e_idx",
            ),
        ),
    ]