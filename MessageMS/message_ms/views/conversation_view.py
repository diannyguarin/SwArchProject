from message_ms.models.conversation_model import Conversation
from message_ms.serializers.conversation_serializer import ConversationSerializer
from message_ms.models.message_model import Message
from message_ms.serializers.message_serializer import MessageSerializer

from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import mixins
from rest_framework import generics
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response


class ConversationList():

    @api_view(['GET', 'POST'])
    def conversation_list(request,pk1):
        if request.method == 'GET':
            try: 
                conversations = Conversation.objects.filter(Q(usuario1Id=pk1) | Q(usuario2Id=pk1)) 
            except Conversation.DoesNotExist: 
                return JsonResponse({'message': 'The conversation does not exist'}, status=status.HTTP_404_NOT_FOUND) 

            conversation_serializer = ConversationSerializer(conversations,many=True)
            
            # 'safe=False' for objects serialization
            
            return JsonResponse(conversation_serializer.data,status=status.HTTP_201_CREATED, safe=False)
    
        elif request.method == 'POST':
            conversation_data = JSONParser().parse(request)
            conversation_serializer = ConversationSerializer(data=conversation_data)
            if conversation_serializer.is_valid():
                conversation_serializer.save()
                return JsonResponse(conversation_serializer.data, status=status.HTTP_201_CREATED) 
            return JsonResponse(conversation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @api_view(['GET', 'POST', 'DELETE'])
    def conversation_messages(request,pk1,pk2):
        if request.method == 'GET':
            try:
                messages = Message.objects.filter(conversationId=pk2)
            except Conversation.DoesNotExist: 
                return JsonResponse({'message': 'The message does not exist'}, status=status.HTTP_404_NOT_FOUND)
            message_serializer = MessageSerializer(messages,many=True)
            return JsonResponse(message_serializer.data,status=status.HTTP_201_CREATED, safe=False)
            
        elif request.method == 'POST':
            message_data = JSONParser().parse(request)
            message_serializer = MessageSerializer(data=message_data)
            if message_serializer.is_valid():
                message_serializer.save()
                return JsonResponse(message_serializer.data, status=status.HTTP_201_CREATED) 
            return JsonResponse(message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #elif request.method == 'DELETE':