from django.urls import path
# from rest_framework import routers
from .views import RegistroView, LoginView, LogoutView, profileView, SubirArchivoApiView, mi_vista, PublicacionView, PublicacionCreateView, CommentarioView, CommentarioCreateView
# from .views import UserViewSe

# routers=routers.DefaultRouter()
# routers.register(r"User", UserViewSet)

urlpatterns = [
    # path('', include(routers.urls)),
    path('register/', RegistroView, name='register'),
    path('login/', LoginView, name='login'),
    path('logout/', LogoutView, name='logout'),
    path('profile/', profileView, name='logout'),
    path('Subir/', SubirArchivoApiView.as_view(), name='Subir'),
    path("tem/", mi_vista, name="tem"),
    path('Publications/', PublicacionView, name='Publicacion'),
    path("Publications/create/", PublicacionCreateView, name="Publicacion-create"),
    path("Comments/", CommentarioView, name="Comentario"),
    path("Comments/create/", CommentarioCreateView, name="Comentario-create"),
]