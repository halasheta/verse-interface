from django.db import models
from django.contrib.auth.models import User
from quran.models import Verse

POST_LEN = 2000
    
class Post(models.Model):
    """
    An interpretation of a particular verse. Only admin users can create posts.
    """
    verses = models.ManyToManyField(to=Verse, related_name='posts')
    user = models.ForeignKey(to=User, related_name='posts', on_delete=models.CASCADE)  
    text = models.CharField(max_length=POST_LEN)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '"{}" --- {}'.format(self.text, self.user.username)

class PostLike(models.Model):
    """
    The favorites or "likes" of a user reply.
    """
    user = models.ForeignKey(to=User, related_name='post_likes', on_delete=models.CASCADE)
    post = models.ForeignKey(to='Post', related_name='likes', on_delete=models.CASCADE)

    def __str__(self):
        return 'User {} liked post {}'.format(self.user.username, self.post.id)
    
    
class PostDislike(models.Model):
    """
    The "dislikes" of a user reply.
    """
    user = models.ForeignKey(to=User, related_name='post_dislikes', on_delete=models.CASCADE)
    post = models.ForeignKey(to='Post', related_name='dislikes', on_delete=models.CASCADE)

    def __str__(self):
        return 'User {} disliked post {}'.format(self.user.username, self.post.id)