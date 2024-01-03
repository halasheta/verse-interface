from django.urls import path

from .views import CreatePost, DeletePost, GetPostsByVerse, GetPostsByUser, LikePost, UnlikePost

app_name = 'posts'

urlpatterns = [
    path('add/', CreatePost.as_view()),
    path('del/<int:id>/', DeletePost.as_view()),
    path('verse/<int:id>/', GetPostsByVerse.as_view()),
    path('user/<int:id>/', GetPostsByUser.as_view()),
    path('like/', LikePost.as_view()),
    path('unlike/', UnlikePost.as_view()),
]
