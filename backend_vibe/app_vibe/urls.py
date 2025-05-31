from django.urls import path
# from rest_framework import routers

# from .views import RegistroView, LoginView, LogoutView, profileView, SubirArchivoApiView, mi_vista,user_detail, user_config
from app_vibe import views
# routers=routers.DefaultRouter()
# routers.register(r"User", UserViewSet)

urlpatterns = [
    # path('', include(routers.urls)),

    path('register/', views.RegistroView, name='register'),
    path('login/', views.LoginView, name='login'),
    path('logout/', views.LogoutView, name='logout'),
    path('profile/', views.profileView, name='logout'),
    path('Subir/', views.SubirArchivoApiView.as_view(), name='Subir'),
    path("tem/", views.mi_vista, name="tem"),
    path('user/<int:user_id>/', views.user_detail, name='user-detail'),
    path("user_config/<int:user_id>/", views.user_config, name="user-config")
    path('Publications/', PublicacionView, name='Publicacion'),
    path("Publications/create/", PublicacionCreateView, name="Publicacion-create"),
    path("Comments/", CommentarioView, name="Comentario"),
    path("Comments/create/", CommentarioCreateView, name="Comentario-create"),
]