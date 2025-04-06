from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, DoctorViewSet, AppointmentViewSet, DoctorLoginView

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = router.urls