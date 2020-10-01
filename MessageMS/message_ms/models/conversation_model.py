from django.db import models
#Antes category
class Conversation(models.Model):
    id = models.AutoField(primary_key = True)
    usuario1Id=models.IntegerField()#temporal mientras se conecta con Usuario
    usuario2Id=models.IntegerField()#temporal mientras se conecta con Usuario

    class Meta:
        app_label = 'message_ms'
