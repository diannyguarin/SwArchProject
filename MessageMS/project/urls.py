from django.urls import path, include

urlpatterns = [
    path('', include('message_ms.urls')),
]

