from datetime import datetime
from django.http import Http404
from TaskApp.models import Task
from TaskApp.serializers import TaskSerializer, UserSerializer, loginSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer

class loginAPIView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        serializer = loginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)


class CreateTaskAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request,):
        fromData = request.data
        serializer = TaskSerializer(data=fromData)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'status': 'Success',
                'data': serializer.data,
                'message': 'Task Added',
                'serviceName': 'TaskAPIView_service',
                'timeStamp': datetime.now().isoformat(),
                'code': 201
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TaskList(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        response_data = {
            'status': 'Success',
            'data': serializer.data,
            'message': 'All task retrived',
            'serviceName': 'TaskList_service',
            'timeStamp': datetime.now().isoformat(),
            'code': 200
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
class TaskAPIView(APIView):
    # permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Task.objects.get(id=pk)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskSerializer(task)
        response_data = {
                'status': 'Success',
                'data': serializer.data,
                'message': 'Task Retrive',
                'serviceName': 'TaskAPIView_service',
                'timeStamp': datetime.now().isoformat(),
                'code': 200
            }
        return Response(response_data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data = {
                'status': 'Success',
                'data': serializer.data,
                'message': 'Task Update',
                'serviceName': 'TaskAPIView_service',
                'timeStamp': datetime.now().isoformat(),
                'code': 200
            }
            return Response(response_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        print(pk)
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
