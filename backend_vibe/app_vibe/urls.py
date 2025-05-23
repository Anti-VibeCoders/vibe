from django.urls import path
# from rest_framework import routers
from .views import RegistroView, LoginView, LogoutView

# routers=routers.DefaultRouter()
# routers.register(r"User", UserViewSet)

urlpatterns = [
    # path('', include(routers.urls)),
    path('register/', RegistroView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]