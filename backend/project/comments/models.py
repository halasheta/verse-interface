from django.db import models
from django.contrib.auth.models import User
from posts.models import Post

COMM_LEN = 2000

class Comment(models.Model):
    """
    A comment on a particular post. Both users and admins can create comments.
    """
    post = models.ForeignKey(to=Post, related_name='comments', on_delete=models.CASCADE)
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, related_name='comments', on_delete=models.CASCADE)
    
    text=models.CharField(max_length=COMM_LEN)
    date_created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ('date_created', )
        
class CommLike(models.Model):
    """
    The favorites or "likes" of a comment.
    """
    user = models.ForeignKey(to=User, related_name='comment_likes', on_delete=models.CASCADE)
    comment = models.ForeignKey(to=Comment, related_name='likes', on_delete=models.CASCADE)

    def __str__(self):
        return 'User {} liked comment {} on post {}'.format(self.user.username, self.comment.id, self.comment.post.id)
    
    
class CommDislike(models.Model):
    """
    The "dislikes" of a comment.
    """
    user = models.ForeignKey(to=User, related_name='comment_dislikes', on_delete=models.CASCADE)
    comment = models.ForeignKey(to=Comment, related_name='dislikes', on_delete=models.CASCADE)

    def __str__(self):
        return 'User {} disliked comment {} on post {}'.format(self.user.username, self.comment.id, self.comment.post.id)

    
