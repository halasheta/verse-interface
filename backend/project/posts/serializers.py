from rest_framework import serializers

from .models import *
from accounts.serializers import UserSerializer
from comments.serializers import GetCommentSerializer

class PostSerializer(serializers.ModelSerializer):
    verses = serializers.PrimaryKeyRelatedField(allow_empty=False, many=True, read_only=True)
    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'text', 'verses', 'likes']


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = ['id', 'user', 'post']


class PostDislikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostDislike
        fields = ['id', 'user', 'post']

        
class GetPostSerializer(serializers.ModelSerializer):
    verses = serializers.PrimaryKeyRelatedField(allow_empty=False, many=True, read_only=True)
    likes = PostLikeSerializer(many=True, read_only=True)
    dislikes = PostDislikeSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    comments = GetCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'text', 'verses', 'likes', 'dislikes', 'comments']

