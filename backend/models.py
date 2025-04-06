from django.db import models
from django.utils import timezone


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = 'client'


class ProfileInformation(models.Model):
    profile = models.OneToOneField(Client, on_delete=models.CASCADE, db_column='profile_id')
    location = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20, blank=True)

    class Meta:
        db_table = 'profileinformation'


class PasswordReset(models.Model):
    reset_code = models.CharField(max_length=255)
    user = models.ForeignKey(Client, on_delete=models.CASCADE, db_column='user_id')
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)

    class Meta:
        db_table = 'password_resets'


class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = 'doctors'
        managed = False

class Speciality(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'specialties'


class DoctorSpecialty(models.Model):
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE, db_column='doctor_id', primary_key=True)
    specialty = models.ForeignKey('Speciality', on_delete=models.CASCADE, db_column='specialty_id')

    class Meta:
        db_table = 'doctor_specialties'
        managed = False

class DoctorService(models.Model):
    id = models.AutoField(primary_key=True)
    doctor = models.ForeignKey('Doctor', on_delete=models.CASCADE, db_column='doctor_id')
    name_service = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'doctor_services'

class Appointment(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE, db_column='user_id')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, db_column='doctor_id')
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    phone = models.CharField(max_length=20, blank=True)
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'appointments'


class Document(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, db_column='doctor_id')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, db_column='client_id')
    doc_data = models.BinaryField()
    doc_type = models.CharField(max_length=50)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'documents'


class Admin(models.Model):
    admin_id = models.AutoField(primary_key=True)
    email = models.EmailField()
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100)
    image = models.CharField(max_length=500, blank=True)
    gender = models.CharField(max_length=50, blank=True)
    date = models.DateField(default=timezone.now)

    class Meta:
        db_table = 'admin'
