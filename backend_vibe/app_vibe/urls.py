from django.urls import path
from app_vibe.view import auth_views, user_views, upload_views, publication_views, coments_views, ai_views

urlpatterns = [
    # auths
    path('auth/register/', auth_views.RegistroViewSet.as_view(), name='auth-register'),
    path('auth/login/', auth_views.LoginViewSet.as_view(), name='auth-login'),
    path('auth/logout/', auth_views.LogoutViewSet.as_view(), name='auth-logout'),
    
    # user
    path('users/<int:user_id>/', user_views.UserDetail.as_view(), name='user-detail'),
    path("users/<int:user_id>/config/", user_views.UserConfig.as_view(), name="user-config"),
    
    # publicactions
    path('Publications/', publication_views.PublicacionView.as_view(), name='Publicacion'),
    path("Publications/create/", publication_views.PublicacionCreateView.as_view(), name="Publicacion-create"),
    
    #coments
    path("Comments/", coments_views.CommentarioView.as_view(), name="Comentario"),
    path("Comments/create/", coments_views.CommentarioCreateView.as_view(), name="Comentario-create"),
    
    # AI
    path('gemini/', ai_views.GeminiEndPoint.as_view(), name='gemini-endpoint'),
  
    path('upload/', upload_views.SubirArchivoApiView.as_view(), name='Subir'),
]