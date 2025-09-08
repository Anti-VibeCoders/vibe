from django.urls import path
from app_vibe.view import (
    auth_views,
    user_views,
    publication_views,
    coments_views,
    gemini_views,
    messages_views
    )


urlpatterns = [
    # auths
    path(
        # Registro de usuario
        # Post
        'auth/register/', 
        auth_views.RegistroViewSet.as_view(),
        name='auth-register'
        ),
    path(
        # Login / Inicio de sesion del usuario
        # Post
        'auth/login/', 
        auth_views.LoginViewSet.as_view(),
        name='auth-login'
        ),
    path(
        # Logout / desconexion del usuario
        # Post
        'auth/logout/', 
        auth_views.LogoutViewSet.as_view(),
        name='auth-logout'
        ),

    # user
    path(
        # Detalles del usuario especificado
        # GET
        'user/<int:user_id>/', 
        user_views.UserDetail.as_view(),
        name='user-detail'
        ),
    path(
        # Configuracion de la informacion del usuario
        # GET, PATCH
        "user/<int:user_id>/config/", 
        user_views.UserConfig.as_view(),
        name="user-config"
        ),
    
    # publicactions
    path(
        # Obtencion de los post
        # GET
        'publications/', 
        publication_views.PostView.as_view(),
        name='Publication'
        ),

    path(
        'publicationsUser/<int:post_id>/',
        publication_views.PostUserView.as_view(),
        name='Publication-user'
        ),

    path(
        # Creacion de los post
        # POST
        "publications/create/", 
        publication_views.PostCreateView.as_view(),
        name="Publication-create"
        ),

    # Messages
    path(
        # Obtencion de los messages
        # GET
        'messages/', 
        messages_views.MessageView.as_view(),
        name='message-list'
         ),
    path(
        # Creacion de los messages
        # POST
        'messages/create/', 
        messages_views.MessageCreateView.as_view(),
        name='message-create'
        ),

    # Comments
    path(
        # Obtencion de los comments
        # GET
        "comments/", 
        coments_views.CommentView.as_view(),
        name="Comment"
         ),

    path(
        "comments/<int:post_id>/",
        coments_views.CommentPostView.as_view(),
        name="Comment-post"
         ),

    path(
        # Creacion de los comments
        # GET
        "comments/create/", 
        coments_views.CommentCreateView.as_view(),
        name="Comment-create"
        ),

    # AI
    path(
        # Conexion con la api de geminis
        # POST
        'gemini/',
        gemini_views.GeminiEndPoint.as_view(),
        name='gemini-endpoint'
        ),
]
