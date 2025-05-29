from rest_framework import viewsets, permissions
from .models import Client, Staff_user, Appointment
from .serializers import ClientSerializer, StaffUserSerializer, AppointmentSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from backend.models import Staff_user  # Изменить импорт с Doctor на Staff_user
from rest_framework import serializers
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class StaffUserViewSet(viewsets.ModelViewSet):
    queryset = Staff_user.objects.all()
    serializer_class = StaffUserSerializer

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
            # Используем filter().first() вместо get()
            doctor = Staff_user.objects.filter(email=email).first()
            if not doctor:
                raise AuthenticationFailed("Неверный email или пароль")

            if doctor.password != password:  # В будущем используйте хеширование паролей
                raise AuthenticationFailed("Неверный email или пароль")

            refresh = RefreshToken.for_user(doctor)

            return {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'doctor_id': doctor.id,
                'email': doctor.email,
                'name': doctor.name,
                'role': doctor.position  # Добавляем роль
            }

        except Exception as e:
            raise AuthenticationFailed("Ошибка авторизации")


class DoctorLoginView(TokenObtainPairView):
    serializer_class = DoctorTokenSerializer


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not hasattr(request.user, 'position'):
            return False
        return request.user.position == 'admin'


class AdminUserManagementViewSet(viewsets.ModelViewSet):
    queryset = Staff_user.objects.all()
    serializer_class = StaffUserSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                # Создаем пользователя
                user = serializer.save()
                
                # Возвращаем данные созданного пользователя
                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED
                )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # Обновление пользователя
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                user = serializer.save()
                return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # Удаление пользователя
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    # Дополнительный метод для изменения роли
    @action(detail=True, methods=['patch'])
    def change_role(self, request, pk=None):
        user = self.get_object()
        new_role = request.data.get('position')
        if new_role:
            user.position = new_role
            user.save()
            return Response({'status': 'role updated'})
        return Response({'error': 'role not provided'}, status=400)