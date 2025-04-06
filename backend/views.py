from rest_framework import viewsets
from .models import Client, Doctor, Appointment
from .serializers import ClientSerializer, DoctorSerializer, AppointmentSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from backend.models import Doctor
from rest_framework import serializers

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class DoctorTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            doctor = Doctor.objects.get(email=email)
        except Doctor.DoesNotExist:
            raise AuthenticationFailed("Неверный email")

        if doctor.password != password:
            raise AuthenticationFailed("Неверный пароль")

        refresh = RefreshToken.for_user(doctor)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'doctor_id': doctor.id,
            'email': doctor.email
        }


class DoctorLoginView(TokenObtainPairView):
    serializer_class = DoctorTokenSerializer