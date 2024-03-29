from rest_framework.generics import get_object_or_404, ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView

from .serializers import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from quran.models import Verse
from django.contrib.auth.models import User
from accounts.views import IsSelfOrAdmin
    
# CRUD Post views
class CreatePost(CreateAPIView):
    permission_classes = [IsAdminUser, IsAuthenticated]
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        instance = serializer.instance

        instance.verses.add(*request.data["verses"])
        instance.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class DeletePost(DestroyAPIView):
    permission_classes = [IsAdminUser, IsAuthenticated]
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
    
class GetPostsByUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GetPostSerializer

    def get_queryset(self):
        user = User.objects.get(id=self.kwargs["id"])
        return user.posts.all()


# Post liking and disliking views
class LikePost(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostLikeSerializer


class DislikePost(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostDislikeSerializer
    

class RemovePostLike(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostLikeSerializer
    queryset = PostLike.objects.all()

    def get_object(self):
        return get_object_or_404(PostLike, 
                                 user=self.request.data["user"],
                                 post=self.request.data["post"])
    
class RemovePostDislike(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostDislikeSerializer
    queryset = PostDislike.objects.all()

    def get_object(self):
        return get_object_or_404(PostDislike, 
                                 user=self.request.data["user"],
                                 post=self.request.data["post"])


