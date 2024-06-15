import uuid
from django.db import models

TaskStatus = (
    ('Pending', 'Pending'),
    ('Completed', 'Completed'),
)

class Task(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4, editable=False, primary_key=True)
    title = models.CharField(blank=True, null=True, max_length=255)
    description = models.TextField()
    status = models.CharField(choices=TaskStatus, blank=True, max_length=255, default='Pending')
