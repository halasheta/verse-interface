from django.contrib import admin
from .models import *


class ChapterAdmin(admin.ModelAdmin):
    model = Chapter
    list_display = ("num", "name_eng", "name_ara")


class VerseAdmin(admin.ModelAdmin):
    model = Verse
    list_display = ("chapter", "num", "text_eng", "text_ara")


admin.site.register(Verse, VerseAdmin)
admin.site.register(Chapter, ChapterAdmin)

