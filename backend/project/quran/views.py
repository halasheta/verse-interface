from rest_framework.generics import get_object_or_404, ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView

from .serializers import *
from rest_framework.permissions import IsAuthenticated, BasePermission, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from accounts.views import IsSelfOrAdmin


class ListChaptersView(ListAPIView):
    permission_classes = []
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()

class CreateChapter(CreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = ChapterSerializer

class DeleteChapter(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()

    def get_object(self):
        return get_object_or_404(Chapter, id=self.kwargs["id"])


class ListVersesView(ListAPIView):
    permission_classes = []
    serializer_class = VerseSerializer
    queryset = Verse.objects.all()

    def get_queryset(self):
        return Verse.objects.filter(chapter=self.kwargs["num"])


class ViewVerseView(RetrieveAPIView):
    permission_classes = []
    serializer_class = VerseSerializer

    def get_object(self):
        return Verse.objects.get(id=self.kwargs["id"])
    

class ViewChapter(RetrieveAPIView):
    permission_classes = []
    serializer_class = ChapterSerializer

    def get_object(self):
        return Chapter.objects.get(id=self.kwargs["id"])
    

class CreateVerse(CreateAPIView):
    # TODO: use pk of chapter to initialize verse
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = VerseSerializer

class DeleteVerse(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = VerseSerializer
    queryset = Verse.objects.all()

    def get_object(self):
        return get_object_or_404(Verse, id=self.kwargs["id"])