from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from message_ms.views.conversation_view import ConversationList
from message_ms.views.conversation_view import ConversationDetail
from message_ms.views.message_view import MessageList
from message_ms.views.message_view import MessageDetail

urlpatterns = [
    path('conversations/<int:pk1>', ConversationList.conversation_list),
    path('conversations<int:pk1>/<int:pk2>', ConversationList.conversation_messages),
    path('conversations/<int:pk1>/<int:pk2>/<int:pk3>', MessageDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)