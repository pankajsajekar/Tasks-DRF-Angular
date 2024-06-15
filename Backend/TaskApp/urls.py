from django.urls import path
from TaskApp import views

urlpatterns = [
    # Account
    path('account/register', views.UserRegistrationView.as_view()),
    path('account/login', views.loginAPIView.as_view()),
    # Task
    path('task/<uuid:pk>/', views.TaskAPIView.as_view()),
    path('task/add/', views.CreateTaskAPIView.as_view()),
    path('', views.TaskList.as_view()),
]
