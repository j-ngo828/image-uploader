# Generated by Django 4.1.5 on 2023-01-28 22:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("imageupload", "0001_initial"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="ImageUploads",
            new_name="ImageUpload",
        ),
    ]