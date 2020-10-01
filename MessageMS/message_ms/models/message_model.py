from django.db import models
from .conversation_model import Conversation
#Antes Product
class Message(models.Model):
    id = models.AutoField(primary_key = True)
    conversationId = models.ForeignKey(Conversation, on_delete = models.CASCADE)
    text = models.TextField()
    sendDate = models.DateField()
    remitenteId = models.IntegerField()#temporal mientras se conecta con Usuario

    class Meta:
	    app_label = 'message_ms'
