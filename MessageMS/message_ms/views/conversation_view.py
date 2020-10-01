from message_ms.models.conversation_model import Conversation
from message_ms.serializers.conversation_serializer import ConversationSerializer
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import mixins
from rest_framework import generics

class ConversationList():
    @api_view(['GET', 'POST'])
    def conversation_list(request,pk1):
        if request.method == 'GET':
            try: 
                conversations = Conversation.objects.filter(usuario1Id=pk1,usuario2Id=pk1) 
            except Conversation.DoesNotExist: 
                return JsonResponse({'message': 'The conversation does not exist'}, status=status.HTTP_404_NOT_FOUND) 

            conversation_serializer = ConversationSerializer(data=conversations, many=True)
            
            # 'safe=False' for objects serialization
            if conversation_serializer.is_valid():
                return JsonResponse(conversation_serializer.data,status=status.HTTP_201_CREATED, safe=False)
            else:
                return JsonResponse(conversation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'POST':
            conversation_data = JSONParser().parse(request)
            conversation_serializer = ConversationSerializer(data=conversation_data)
        if conversation_serializer.is_valid():
            conversation_serializer.save()
            return JsonResponse(conversation_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(conversation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConversationDetail(mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     generics.GenericAPIView):
                     
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
