from djongo import models

class User(models.Model):
    umail = models.EmailField(unique=True)  # Email field for unique user identification
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.umail

class Employer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # One-to-one relationship with User
    b_type = models.CharField(max_length=255)
    b_info = models.TextField()
    b_name = models.CharField(max_length=255)

    def __str__(self):
        return self.b_name

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # One-to-one relationship with User
    e_info = models.TextField()
    e_name = models.CharField(max_length=255)
    e_age = models.IntegerField()
    e_skills = models.TextField()

    def __str__(self):
        return self.e_name

class Resume(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='resumes')  # One-to-many relationship with Employee
    skills = models.TextField()
    location = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    education = models.TextField()
    bio = models.TextField()
    experience = models.TextField()

    def __str__(self):
        return f"{self.name}'s Resume"

class Listings(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listings')  # One-to-many relationship with User
    skills = models.TextField(default=None, blank=True)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name='listings')  # One-to-many relationship with Employer
    l_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return self.l_name
