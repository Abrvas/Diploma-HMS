from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from .views import (
    ClientViewSet, 
    StaffUserViewSet,  
    AppointmentViewSet, 
    DoctorLoginView,
    AdminUserManagementViewSet
)

# Настройка Swagger
schema_view = get_schema_view(
   openapi.Info(
      title="Hospital Management System API",
      default_version='v1',
      description="API документация для системы управления больницей",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'staff-users', StaffUserViewSet)  
router.register(r'appointments', AppointmentViewSet)
router.register(r'admin/users', AdminUserManagementViewSet, basename='admin-users')  # Добавляем уникальный basename

urlpatterns = [
    path('staff-user/<int:pk>/', StaffUserViewSet.as_view({'get': 'retrieve'})),
    path('', include(router.urls)),
    # Swagger URLs
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]