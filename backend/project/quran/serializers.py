from rest_framework import serializers

from .models import *


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['num', 'name_eng', 'name_ara']


class VerseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verse
        fields = ['chapter', 'num', 'text_eng', 'text_ara']