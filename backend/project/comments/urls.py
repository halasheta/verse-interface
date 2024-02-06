from django.urls import path

from .views import CreateComment, DeleteComment, LikeComment, DislikeComment, RemoveCommDislike, RemoveCommLike, \
    GetCommentsByUser

app_name = 'comments'

urlpatterns = [
    path('add/', CreateComment.as_view()),
    path('del/<int:id>/', DeleteComment.as_view()),
    
    path('user/<int:id>/', GetCommentsByUser.as_view()),
    
    path('like/', LikeComment.as_view()),
    path('dislike/', DislikeComment.as_view()),
    
    path('del/like/', RemoveCommLike.as_view()),
    path('del/dislike/', RemoveCommDislike.as_view()),
]
