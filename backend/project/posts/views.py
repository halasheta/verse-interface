from rest_framework.generics import get_object_or_404, ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView

from .serializers import *
from rest_framework.permissions import IsAuthenticated, BasePermission, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from quran.models import Verse
from accounts.views import IsSelfOrAdmin
    
    
class CreatePost(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        # input_lst = request.data["verses"]
        # verses = input_lst.split(',')

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        instance = serializer.instance

        instance.verses.add(*request.data["verses"])
        instance.save()

        return Response(status=status.HTTP_201_CREATED)

class DeletePost(DestroyAPIView):
    permission_classes = [IsSelfOrAdmin, IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    
    def get_object(self):
        return get_object_or_404(Post, id=self.kwargs["id"])

class GetPostsByVerse(ListAPIView):
    permission_classes = []
    serializer_class = GetPostSerializer

    def get_queryset(self):
        verse = Verse.objects.get(id=self.kwargs["id"])

        return verse.posts.all()
    
class LikePost(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LikeSerializer

class UnlikePost(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

    def get_object(self):
        return get_object_or_404(Like, 
                                 user=self.request.data["user"],
                                 post=self.request.data["post"])

