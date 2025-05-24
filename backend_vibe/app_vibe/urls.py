from django.urls import path
# from rest_framework import routers
from .views import RegistroView, LoginView, LogoutView, profileView

# routers=routers.DefaultRouter()
# routers.register(r"User", UserViewSet)

urlpatterns = [
    # path('', include(routers.urls)),
    path('register/', RegistroView, name='register'),
    path('login/', LoginView, name='login'),
    path('logout/', LogoutView, name='logout'),
    path('profile/', profileView, name='logout')
]