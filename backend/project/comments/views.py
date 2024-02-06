from rest_framework.generics import get_object_or_404, ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView

from .serializers import *
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from accounts.views import IsSelfOrAdmin


# Comment liking and disliking views
class LikeComment(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommLikeSerializer


class DislikeComment(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommDislikeSerializer
  
    
class RemoveCommLike(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommLikeSerializer
    queryset = CommLike.objects.all()

    def get_object(self):
        return get_object_or_404(CommLike, 
                                 user=self.request.data["user"],
                                 comment=self.request.data["comment"])
    
    
class RemoveCommDislike(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommDislikeSerializer
    queryset = CommDislike.objects.all()

    def get_object(self):
        return get_object_or_404(CommDislike, 
                                 user=self.request.data["user"],
                                 comment=self.request.data["comment"])

# Comment CRUD Views
class CreateComment(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    
    
class DeleteComment(DestroyAPIView):
    permission_classes = [IsSelfOrAdmin, IsAuthenticated]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    
    def get_object(self):
        return get_object_or_404(Comment, id=self.kwargs["id"])
    
class GetCommentsByUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GetCommentSerializer

    def get_queryset(self):
        user = User.objects.get(id=self.kwargs["id"])
        return user.comments.all()
