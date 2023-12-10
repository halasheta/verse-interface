from django.db import models
from django.contrib.auth.models import User
from quran.models import Verse

POST_LEN = 2000


class Post(models.Model):
    """
    A user's interpretation of a particular verse.
    """
    verses = models.ManyToManyField(to=Verse, related_name='posts')
    user = models.ForeignKey(to=User, related_name='posts', on_delete=models.CASCADE)  # possibly SET_NULL?
    text = models.CharField(max_length=POST_LEN)

    def __str__(self):
        return '"{}" --- {}'.format(self.text, self.user.username)


class Like(models.Model):
    """
    The favorites or "likes" of a user reply.
    """
    user = models.ForeignKey(to=User, related_name='likes', on_delete=models.CASCADE)
    post = models.ForeignKey(to='Post', related_name='likes', on_delete=models.CASCADE)

    def __str__(self):
        return 'User {} liked a post to {}, Verse {}'.format(self.user.username,
                                                             self.post.verse.chapter.name_eng,
                                                             self.post.verse.num)
