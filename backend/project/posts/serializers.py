from rest_framework import serializers

from .models import *
from accounts.serializers import UserSerializer

class PostSerializer(serializers.ModelSerializer):
    verses = serializers.PrimaryKeyRelatedField(allow_empty=False, many=True, read_only=True)
    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'text', 'verses', 'likes']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post']

class DislikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dislike
        fields = ['id', 'user', 'post']

class GetPostSerializer(serializers.ModelSerializer):
    verses = serializers.PrimaryKeyRelatedField(allow_empty=False, many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)
    dislikes = DislikeSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'text', 'verses', 'likes', 'dislikes']

