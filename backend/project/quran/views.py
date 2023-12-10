from rest_framework.generics import get_object_or_404, ListAPIView, RetrieveAPIView

from .serializers import *


class ListChaptersView(ListAPIView):
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()


class ListVersesView(ListAPIView):
    serializer_class = VerseSerializer
    queryset = Verse.objects.all()

    def get_queryset(self):
        return Verse.objects.filter(chapter=self.kwargs["num"])


class ViewVerseView(RetrieveAPIView):
    serializer_class = VerseSerializer

    def get_object(self):
        qs = Verse.objects.filter(chapter=self.kwargs["chapter_num"])
        return qs.get(id=self.kwargs["num"])
