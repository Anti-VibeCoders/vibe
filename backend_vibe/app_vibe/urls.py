from django.urls import path
from app_vibe.view import auth_views, user_views, profile_views, conexion_views

urlpatterns = [
    # auths
    path('auth/register/', auth_views.RegistroViewSet.as_view(), name='auth-register'),
    path('auth/login/', auth_views.LoginViewSet.as_view(), name='auth-login'),
    path('auth/logout/', auth_views.LogoutViewSet.as_view(), name='auth-logout'),
    
    # user
    path('users/<int:user_id>/', user_views.user_detail, name='user-detail'),
    path("users/<int:user_id>/config/", user_views.user_config, name="user-config"),
    
    # profile
    path('profile/', profile_views.UserProfileViewSet.as_view(), name='logout'),
    
    # publicactions
    path('Publications/', conexion_views.PublicacionView, name='Publicacion'),
    path("Publications/create/", conexion_views.PublicacionCreateView, name="Publicacion-create"),
    
    #coments
    path("Comments/", conexion_views.CommentarioView, name="Comentario"),
    path("Comments/create/", conexion_views.CommentarioCreateView, name="Comentario-create"),
    
    path('upload/', conexion_views.SubirArchivoApiView.as_view(), name='Subir'),
]