from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Task

class TaskTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_task(self):
        url = '/api/task/'
        data = {'title': 'Test task', 'description': 'This is a test task'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'Test task')
        self.assertEqual(Task.objects.get().description, 'This is a test task')

    def test_retrieve_task(self):
        task = Task.objects.create(title='Test task', description='This is a test task')
        url = f'/api/task/{task.id}/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test task')
        self.assertEqual(response.data['description'], 'This is a test task')

    def test_update_task(self):
        task = Task.objects.create(title='Test task', description='This is a test task')
        url = f'/api/task/{task.id}/'
        data = {'title': 'Updated Test task', 'description': 'This is an updated test task'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Test task')
        self.assertEqual(response.data['description'], 'This is an updated test task')

    def test_delete_task(self):
        task = Task.objects.create(title='Test task', description='This is a test task')
        url = f'/api/task/{task.id}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)
