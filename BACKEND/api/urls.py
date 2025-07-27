from django.urls import path
from .views import UserDetailView, LoginView, RegisterView

urlpatterns = [
    path('users/<int:id>/', UserDetailView.as_view(), name='user-detail'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register')
]