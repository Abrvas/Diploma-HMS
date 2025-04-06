from django.contrib import admin
from .models import Admin, Client, Doctor, Appointment, DoctorService, Speciality, DoctorSpecialty, PasswordReset, ProfileInformation

admin.site.register(Admin)
admin.site.register(Client)
admin.site.register(Doctor)
admin.site.register(Appointment)
admin.site.register(DoctorService)
admin.site.register(Speciality)
admin.site.register(PasswordReset)
admin.site.register(ProfileInformation)

@admin.register(DoctorSpecialty)
class DoctorSpecialtyAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'specialty')
    search_fields = ('doctor__name', 'specialty__name')
    list_filter = ('specialty',)
