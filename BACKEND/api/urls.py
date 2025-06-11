from django.urls import path
from .views import (
    UserListCreateView,
    UserDetailView,
    EmployerListCreateView,
    EmployerDetailView,
    EmployeeListCreateView,
    EmployeeDetailView,
    ResumeListCreateView,
    ResumeDetailView,
    ResumeUploadView,  # Import the ResumeUploadView
    ListingListCreateView,
    ListingDetailView,
    EmployerRegisterView,
    EmployerLoginView,
    EmployeeRegisterView,
    EmployeeLoginView,
)

urlpatterns = [
    # User endpoints
    path('users/', UserListCreateView.as_view(), name='user-list-create'),  # GET: List all users, POST: Create a new user
    path('users/<int:id>/', UserDetailView.as_view(), name='user-detail'),  # GET: Retrieve user by ID, PUT: Update user, DELETE: Delete user

    # Employer endpoints
    path('employers/', EmployerListCreateView.as_view(), name='employer-list-create'),  # GET: List all employers, POST: Create a new employer
    path('employers/<int:id>/', EmployerDetailView.as_view(), name='employer-detail'),  # GET: Retrieve employer by ID, PUT: Update employer, DELETE: Delete employer
    path('employers/register/', EmployerRegisterView.as_view(), name='employer-register'),  # POST: Register a new employer (requires user ID)
    path('employers/login/', EmployerLoginView.as_view(), name='employer-login'),  # POST: Login as an employer (requires user ID and password)

    # Employee endpoints
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),  # GET: List all employees, POST: Create a new employee
    path('employees/<int:id>/', EmployeeDetailView.as_view(), name='employee-detail'),  # GET: Retrieve employee by ID, PUT: Update employee, DELETE: Delete employee
    path('employees/register/', EmployeeRegisterView.as_view(), name='employee-register'),  # POST: Register a new employee (requires user ID)
    path('employees/login/', EmployeeLoginView.as_view(), name='employee-login'),  # POST: Login as an employee (requires user ID and password)

    # Resume endpoints
    path('resumes/', ResumeListCreateView.as_view(), name='resume-list-create'),  # GET: List all resumes, POST: Create a new resume
    path('resumes/<int:id>/', ResumeDetailView.as_view(), name='resume-detail'),  # GET: Retrieve resume by ID, PUT: Update resume, DELETE: Delete resume
    path('resumes/upload/<int:employee_id>/', ResumeUploadView.as_view(), name='resume-upload'),  # POST: Upload and process a resume for an employee (requires PDF file)

    # Listing endpoints
    path('listings/', ListingListCreateView.as_view(), name='listing-list-create'),  # GET: List all listings, POST: Create a new listing
    path('listings/<int:id>/', ListingDetailView.as_view(), name='listing-detail'),  # GET: Retrieve listing by ID, PUT: Update listing, DELETE: Delete listing
]
