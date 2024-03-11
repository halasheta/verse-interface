from rest_framework import serializers

from .models import *
from accounts.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'parent', 'post']

class CommLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommLike
        fields = ['id', 'user', 'comment']


class CommDislikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommDislike
        fields = ['id', 'user', 'comment']
        
class GetCommentSerializer(serializers.ModelSerializer):
    likes = CommLikeSerializer(many=True, read_only=True)
    dislikes = CommDislikeSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'post', 'parent', 'likes', 'dislikes', 'date_created']