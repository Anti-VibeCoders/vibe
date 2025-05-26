from django.urls import path
# from rest_framework import routers
from .views import RegistroView, LoginView, LogoutView, profileView, SubirArchivoApiView, mi_vista

# routers=routers.DefaultRouter()
# routers.register(r"User", UserViewSet)

urlpatterns = [
    # path('', include(routers.urls)),
    path('register/', RegistroView, name='register'),
    path('login/', LoginView, name='login'),
    path('logout/', LogoutView, name='logout'),
    path('profile/', profileView, name='logout'),
    path('Subir/', SubirArchivoApiView.as_view(), name='Subir'),
    path("tem/", mi_vista, name="tem")
]