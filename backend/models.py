from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import check_password, make_password


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = 'client'

    def __str__(self):
        return self.email


class ProfileInformation(models.Model):
    profile = models.OneToOneField(Client, on_delete=models.CASCADE, db_column='profile_id')
    location = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20, blank=True)

    class Meta:
        db_table = 'profileinformation'

    def __str__(self):
        return self.name


class PasswordReset(models.Model):
    reset_code = models.CharField(max_length=255)
    user = models.ForeignKey(Client, on_delete=models.CASCADE, db_column='user_id')
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)

    class Meta:
        db_table = 'password_resets'


class Staff_user(models.Model):
    ROLES = (
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('cashier', 'Cashier'),
        ('director', 'Director'),
    )

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    password = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='doctor_photos/', blank=True, null=True)
    position = models.CharField(max_length=100, choices=ROLES, blank=True)

    class Meta:
        db_table = 'staff_users'
        managed = False

    def __str__(self):
        return self.name

    def check_password(self, raw_password):
        """
        Проверяет соответствие сырого пароля хешированному
        """
        return check_password(raw_password, self.password)

    def set_password(self, raw_password):
        """
        Устанавливает хешированный пароль
        """
        self.password = make_password(raw_password)
        self.save()


class Speciality(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'specialties'

    def __str__(self):
        return self.name


class DoctorSpecialty(models.Model):
    doctor = models.ForeignKey('Staff_user', on_delete=models.CASCADE, db_column='doctor_id', primary_key=True)
    specialty = models.ForeignKey('Speciality', on_delete=models.CASCADE, db_column='specialty_id')

    class Meta:
        db_table = 'doctor_specialties'
        managed = False


class DoctorService(models.Model):
    id = models.AutoField(primary_key=True)
    doctor = models.ForeignKey(Staff_user, on_delete=models.CASCADE, db_column='doctor_id')  # Изменено с 'staff_users' на Staff_user
    name_service = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'doctor_services'

    def __str__(self):
        return f"{self.name_service} - {self.doctor.name}"


class Appointment(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE, db_column='user_id')
    doctor = models.ForeignKey(Staff_user, on_delete=models.CASCADE, db_column='doctor_id')
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    phone = models.CharField(max_length=20, blank=True)
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='pending')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'appointments'


class Document(models.Model):
    doctor = models.ForeignKey(Staff_user, on_delete=models.CASCADE, db_column='doctor_id')
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

    def __str__(self):
        return self.username
