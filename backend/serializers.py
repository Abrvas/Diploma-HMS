from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Client, Staff_user, Appointment

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class StaffUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff_user
        fields = ['id', 'name', 'email', 'phone', 'photo', 'position', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Пароль только для записи
        }

    def create(self, validated_data):
        # Хешируем пароль перед сохранением
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Хешируем пароль только если он был изменен
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'