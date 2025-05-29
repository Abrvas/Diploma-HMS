from django.contrib import admin
from .models import (
    Client, ProfileInformation, PasswordReset, Staff_user,
    Speciality, DoctorSpecialty, DoctorService, Appointment,
    Document, Admin
)

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'email')
    search_fields = ('email',)

@admin.register(ProfileInformation)
class ProfileInformationAdmin(admin.ModelAdmin):
    list_display = ('profile', 'name', 'phone_number', 'location')
    search_fields = ('name', 'phone_number')

@admin.register(Staff_user)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone', 'created_at', 'position')
    search_fields = ('name', 'email', 'phone')
    list_filter = ('created_at',)

@admin.register(Speciality)
class SpecialityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(DoctorService)
class DoctorServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'doctor', 'name_service', 'price')
    search_fields = ('name_service',)
    list_filter = ('doctor',)

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'doctor', 'appointment_date', 'appointment_time', 'status', 'created_at')
    search_fields = ('user__email', 'doctor__name')
    list_filter = ('status', 'appointment_date', 'created_at')

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'client','doc_data', 'doc_type', 'created_at')
    list_filter = ('doc_type', 'created_at')

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ('admin_id', 'email', 'username', 'full_name', 'gender', 'date')
    search_fields = ('email', 'username', 'full_name')
    list_filter = ('gender', 'date')

@admin.register(DoctorSpecialty)
class DoctorSpecialtyAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'specialty')
    search_fields = ('doctor__name', 'specialty__name')
    list_filter = ('specialty',)
