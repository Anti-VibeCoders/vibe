from django.urls import path, include
from rest_framework import routers
from app_vibe import views 

routers=routers.DefaultRouter()
routers.register(r"User", views.UserViewSet)

urlpatterns = [
    path('', include(routers.urls)),

]