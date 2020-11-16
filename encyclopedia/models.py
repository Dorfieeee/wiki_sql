from django.db import models
from django.urls import reverse

# Create your models here.
class Entry(models.Model):
    title = models.CharField(max_length=64, unique=True)
    content = models.TextField(max_length=50000)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def nice_title(self):
        return self.title.replace('_', ' ')