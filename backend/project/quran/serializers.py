from rest_framework import serializers

from .models import *

class ChapterSerializer(serializers.ModelSerializer):
    verses = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Chapter
        fields = ['id', 'num', 'name_eng', 'name_ara', 'verses']


class VerseSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Verse
        fields = ['id', 'chapter', 'num', 'text_eng', 'text_ara', 'posts']