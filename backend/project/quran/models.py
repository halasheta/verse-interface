from django.db import models

VERSE_LEN = 1500


class Chapter(models.Model):
    """
    A chapter of the Quran.
    """
    num = models.IntegerField(unique=True)
    name_eng = models.CharField(max_length=40)
    name_ara = models.CharField(max_length=40)

    def __str__(self):
        return '{}, Chapter {}'.format(self.name_eng, self.num)


class Verse(models.Model):
    """
    A verse belonging to a certain chapter in the Quran.
    """
    chapter = models.ForeignKey(to='Chapter', related_name='quran', on_delete=models.CASCADE)
    text_eng = models.CharField(max_length=VERSE_LEN)
    text_ara = models.CharField(max_length=VERSE_LEN)

    num = models.IntegerField(default=0)

    def __str__(self):
        return '{}, Verse {}\n "{}"'.format(self.chapter.name_eng, self.num, self.text_eng)
