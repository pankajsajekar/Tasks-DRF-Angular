# Generated by Django 5.0.6 on 2024-06-14 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField()),
                ('status', models.CharField(blank=True, choices=[('Pending', 'Pending'), ('Completed', 'Completed')], max_length=255)),
            ],
        ),
    ]
