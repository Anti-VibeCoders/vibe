from django.urls import path
from .views import Main

urlpatterns = [
    path('hello/', Main.as_view(), name='hello'),

]