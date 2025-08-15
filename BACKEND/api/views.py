from django.contrib.auth import authenticate, login, get_user_model
from rest_framework.views import APIView, View
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse

class UserDetailView(APIView):
    def get(self, request, id):
        try:
            user = CustomUser.objects.get(id=id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username)
        print(password)
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return Response({'message' : 'Login Successful'})
        return Response({'message' : 'Invalid Credentials'})

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message' : 'User registered Successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CheckAuthView(LoginRequiredMixin, View):
    permission_classes = [permissions.AllowAny]

    login_url = "/login/"
    redirect_field_name = None
    
    def handle_no_permission(self):
        return JsonResponse({"authenticated" : False}, status=401)
    
    def get(self, request):
        return JsonResponse({
            "authenticated" : True,
            "user" : request.user.username
        })