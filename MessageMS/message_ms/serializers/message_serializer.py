from rest_framework import serializers
from message_ms.models.message_model import Message
from message_ms.models.conversation_model import Conversation
from message_ms.serializers.conversation_serializer import ConversationSerializer

class MessageSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = Message
        fields = ['id', 'conversationId', 'text', 'sendDate', 'remitenteId']

    def create(self, validated_data):

        message = Message(conversationId = validated_data.get("conversationId"),
                          text = validated_data.get("text"),
                          sendDate = validated_data.get("sendDate"),
                          remitenteId = validated_data.get("remitenteId"))
        message.save()
        return message

    def to_representation(self, obj):

        data = super().to_representation(obj)

        conversation = Conversation.objects.get(id = data["conversationId"])
        conversationSerializer = ConversationSerializer(conversation)

        data["conversationId"] = conversationSerializer.data

        return data
