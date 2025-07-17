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
    path('auth/register/', auth_views.RegistroViewSet.as_view(), name='auth-register'),
    path('auth/login/', auth_views.LoginViewSet.as_view(), name='auth-login'),
    path('auth/logout/', auth_views.LogoutViewSet.as_view(), name='auth-logout'),
    
    # user
    path('users/<int:user_id>/', user_views.UserDetail.as_view(), name='user-detail'),
    path("users/<int:user_id>/config/", user_views.UserConfig.as_view(), name="user-config"),
    
    # publicactions
    path('Publications/', publication_views.PostView.as_view(), name='Publication'),
    path("Publications/create/", publication_views.PostCreateView.as_view(), name="Publication-create"),
    
    # Messages
    path('messages/', messages_views.MessageView.as_view(), name='message-list'),
    path('messages/create/', messages_views.MessageCreateView.as_view(), name='message-create'),

    #coments
    path("Comments/", coments_views.CommentView.as_view(), name="Comment"),
    path("Comments/create/", coments_views.CommentCreateView.as_view(), name="Comment-create"),
    
    # AI
    path('gemini/', ai_views.GeminiEndPoint.as_view(), name='gemini-endpoint'),
]