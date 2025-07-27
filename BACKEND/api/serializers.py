from rest_framework import serializers
from .models import CustomUser, Company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    
    class Meta:
        model = CustomUser
        fields = '__all__'
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'role', 'status']
        #I forgot to add a user to moderate a Company please do it later
    def create(self, validated_data):
        user = CustomUser(
            username = validated_data['username'],
            email = validated_data['email'],
            role = validated_data['role'],
            status = validated_data['status']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user