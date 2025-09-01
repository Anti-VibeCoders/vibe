from django.urls import path
from app_vibe.view import (
    auth_views,
    user_views,
    publication_views,
    coments_views,
    ai_views,
    messages_views
    )


urlpatterns = [
    # auths
    path(
        'auth/register/', # Registro de usuario
        auth_views.RegistroViewSet.as_view(),
        name='auth-register'
        ),
    path(
        'auth/login/', # Login / Inicio de sesion del usuario
        auth_views.LoginViewSet.as_view(),
        name='auth-login'
        ),
    path(
        'auth/logout/', # Logout / desconexion del usuario
        auth_views.LogoutViewSet.as_view(),
        name='auth-logout'
        ),

    # user
    path(
        'user/<int:user_id>/', # Detalles del usuario especificado
        user_views.UserDetail.as_view(),
        name='user-detail'
        ),
    path(
        "user/<int:user_id>/config/", # Configuracion de la informacion del usuario
        user_views.UserConfig.as_view(),
        name="user-config"
        ),
    path(
        "user/avatar/config/", # configuracion de el avatar del usuario
        user_views.UserAvatar.as_view(),
        name="user-avatar"
        ),
    
    # publicactions
    path(
        'publications/', # Obtencion de los post
        publication_views.PostView.as_view(),
        name='Publication'
        ),
    path(
        "publications/create/", # Creacion de los post
        publication_views.PostCreateView.as_view(),
        name="Publication-create"
        ),

    # Messages
    path(
        'messages/', # Obtencion de los messages
        messages_views.MessageView.as_view(),
        name='message-list'
         ),
    path(
        'messages/create/', # Creacion de los messages
        messages_views.MessageCreateView.as_view(),
        name='message-create'
        ),

    # Coments
    path(
        "comments/", # Obtencion de los comments
        coments_views.CommentView.as_view(),
        name="Comment"
         ),
    path(
        "comments/create/", # Creacion de los comments
        coments_views.CommentCreateView.as_view(),
        name="Comment-create"
        ),

    # AI
    path(
        'gemini/', # Conexion con la api de geminis
        ai_views.GeminiEndPoint.as_view(),
        name='gemini-endpoint'
        ),
]
