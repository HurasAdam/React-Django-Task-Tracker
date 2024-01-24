# Generated by Django 5.0.1 on 2024-01-24 15:20

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0009_alter_customuser_first_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="role",
            field=models.CharField(
                choices=[
                    ("guest", "Guest"),
                    ("member", "Member"),
                    ("manager", "Manager"),
                    ("admin", "Admin"),
                ],
                default="guest",
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="customuser",
            name="theme",
            field=models.CharField(
                choices=[("dark_blue", "Dark Blue"), ("light_blue", "Light Blue")],
                default="dark_blue",
                max_length=20,
            ),
        ),
    ]