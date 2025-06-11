from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
# from .models import User, Employer, Employee, Resume, Listings
# from .serializers import (
#     UserSerializer,
#     EmployerSerializer,
#     EmployeeSerializer,
#     ResumeSerializer,
#     ListingsSerializer,
# )
import json
import re
import pdfplumber
from django.shortcuts import get_object_or_404
from google import genai

# Initialize the Gemini Client with your API key
api_key = "NONE"  # Replace with your valid Gemini API key
client = genai.Client(api_key=api_key)

# Define the prompt for the Gemini API
prompt = """
You are an AI trained to extract and organize key information from a resume. Given the resume text below, extract the following fields:

- Name: The full name of the person.
- Education: A summary of the person's educational background, including degrees and institutions.
- Location: The city and state or country where the person is located.
- Experience: A summary of the person's work experience, including job titles and companies.
- Skills: A list of the person's key skills or technical proficiencies.
- Bio: A brief personal summary or career overview.

Return the extracted data in the following JSON format:

{
  "name": "Full Name",
  "education": "Educational background including degrees and institutions",
  "location": "City, State (or Country)",
  "experience": "Work experience summary with job titles and companies",
  "skills": ["Skill 1", "Skill 2", "Skill 3", ...],
  "bio": "A brief bio or career overview"
}

Here is the resume text to analyze:
"""

# --- User APIs --- (LEGACY APIS SAHARA V1)
# class UserListCreateView(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     lookup_field = 'id'  # Use 'id' as the lookup field

# # --- Employer APIs ---
# class EmployerListCreateView(generics.ListCreateAPIView):
#     queryset = Employer.objects.all()
#     serializer_class = EmployerSerializer

# class EmployerDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Employer.objects.all()
#     serializer_class = EmployerSerializer
#     lookup_field = 'id'  # Use 'id' as the lookup field

# class EmployerRegisterView(APIView):
#     def post(self, request):
#         user_id = request.data.get('user')  # Extract the user ID from the request
#         try:
#             # Fetch the User instance based on the provided ID
#             user = User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             return Response({"error": "User with this ID does not exist!"}, status=status.HTTP_404_NOT_FOUND)

#         # Prepare the Employer data
#         employer_data = {
#             "user": user.id,  # Pass the User instance's ID
#             "b_type": request.data.get("b_type"),
#             "b_info": request.data.get("b_info"),
#             "b_name": request.data.get("b_name"),
#         }

#         # Serialize and save the Employer object
#         serializer = EmployerSerializer(data=employer_data)
#         if serializer.is_valid():
#             serializer.save(user=user)  # Pass the User instance explicitly
#             return Response({"message": "Employer registered successfully!"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class EmployerLoginView(APIView):
#     def post(self, request):
#         user_id = request.data.get("user_id")
#         password = request.data.get("password")
#         try:
#             employer = Employer.objects.get(user__id=user_id)
#             print(password)
#             print(employer.user.password)
#             print(check_password(password, employer.user.password))
#             if password == employer.user.password:
#                 return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
#             return Response({"error": "Invalid password!"}, status=status.HTTP_401_UNAUTHORIZED)
#         except Employer.DoesNotExist:
#             return Response({"error": "Employer not found!"}, status=status.HTTP_404_NOT_FOUND)

# # --- Employee APIs ---
# class EmployeeListCreateView(generics.ListCreateAPIView):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer

# class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer
#     lookup_field = 'id'  # Use 'id' as the lookup field

# class EmployeeRegisterView(APIView):
#     def post(self, request):
#         user_id = request.data.get('user')  # Extract the user ID from the request
#         try:
#             # Fetch the User instance based on the provided ID
#             user = User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             return Response({"error": "User with this ID does not exist!"}, status=status.HTTP_404_NOT_FOUND)

#         # Prepare the Employee data
#         employee_data = {
#             "user": user.id,  # Pass the User instance's ID
#             "e_info": request.data.get("e_info"),
#             "e_name": request.data.get("e_name"),
#             "e_age": request.data.get("e_age"),
#             "e_skills": request.data.get("e_skills"),
#         }

#         # Serialize and save the Employee object
#         serializer = EmployeeSerializer(data=employee_data)
#         if serializer.is_valid():
#             serializer.save(user=user)  # Pass the User instance explicitly
#             return Response({"message": "Employee registered successfully!"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class EmployeeLoginView(APIView):
#     def post(self, request):
#         user_id = request.data.get("user_id")
#         password = request.data.get("password")
#         try:
#             employee = Employee.objects.get(user__id=user_id)
#             if password == employee.user.password:
#                 return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
#             return Response({"error": "Invalid password!"}, status=status.HTTP_401_UNAUTHORIZED)
#         except Employee.DoesNotExist:
#             return Response({"error": "Employee not found!"}, status=status.HTTP_404_NOT_FOUND)

# # --- Resume APIs ---
# class ResumeListCreateView(generics.ListCreateAPIView):
#     queryset = Resume.objects.all()
#     serializer_class = ResumeSerializer

# class ResumeDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Resume.objects.all()
#     serializer_class = ResumeSerializer
#     lookup_field = 'id'  # Use 'id' as the lookup field

# class ResumeUploadView(APIView):
#     def post(self, request, employee_id):
#         # Get the employee instance
#         employee = get_object_or_404(Employee, id=employee_id)

#         # Check if a file is provided
#         if 'file' not in request.FILES:
#             return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)

#         # Extract the uploaded file
#         uploaded_file = request.FILES['file']

#         # Extract text from the PDF file using pdfplumber
#         try:
#             with pdfplumber.open(uploaded_file) as pdf:
#                 text = ""
#                 for page in pdf.pages:
#                     text += page.extract_text()
#         except Exception as e:
#             return Response({"error": f"Failed to process the PDF file: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

#         # Combine the prompt with the extracted resume text
#         full_prompt = prompt + "\n\nResume Text:\n" + text

#         # Make the API call to the Gemini model to process the resume
#         try:
#             response = client.models.generate_content(
#                 model="gemini-2.0-flash",  # Use the correct model name
#                 contents=full_prompt,
#             )
#         except Exception as e:
#             return Response({"error": f"Failed to process the resume with Gemini API: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # Clean the raw response to remove any unwanted characters like "```json" and "```"
#         def clean_json_string(json_string):
#             cleaned_string = json_string.strip()
#             cleaned_string = re.sub(r"^```json", "", cleaned_string)
#             cleaned_string = re.sub(r"```$", "", cleaned_string)
#             return cleaned_string

#         cleaned_response = clean_json_string(response.text)

#         # Parse the cleaned response as JSON
#         try:
#             parsed_response = json.loads(cleaned_response)
#         except json.JSONDecodeError:
#             return Response({"error": "Failed to parse the response from Gemini API as JSON."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # Save the parsed data to the Resume model
#         resume_data = {
#             "employee": employee.id,
#             "skills": ", ".join(parsed_response.get("skills", [])),
#             "location": parsed_response.get("location", ""),
#             "name": parsed_response.get("name", ""),
#             "education": parsed_response.get("education", ""),
#             "bio": parsed_response.get("bio", ""),
#             "experience": parsed_response.get("experience", ""),
#         }

#         serializer = ResumeSerializer(data=resume_data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "Resume uploaded and processed successfully!", "data": serializer.data}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # --- Listing APIs ---
# class ListingListCreateView(generics.ListCreateAPIView):
#     queryset = Listings.objects.all()
#     serializer_class = ListingsSerializer

# class ListingDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Listings.objects.all()
#     serializer_class = ListingsSerializer
#     lookup_field = 'id'  # Use 'id' as the lookup field

