from rest_framework import serializers
from message_ms.models.conversation_model import Conversation 

class ConversationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Conversation
        fields = ['id', 'usuario1Id', 'usuario2Id']

