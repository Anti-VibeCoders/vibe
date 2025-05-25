from django.urls import path
# from rest_framework import routers
from .views import RegistroView, LoginView, LogoutView, profileView, PublicacionView, PublicacionCreateView

# routers=routers.DefaultRouter()
# routers.register(r"User", UserViewSet)

urlpatterns = [
    # path('', include(routers.urls)),
    path('register/', RegistroView, name='register'),
    path('login/', LoginView, name='login'),
    path('logout/', LogoutView, name='logout'),
    path('profile/', profileView, name='logout'),
    path('Publications/', PublicacionView, name='Publicacion'),
    path("Publications/create/", PublicacionCreateView, name="Publicacion-create"),
]