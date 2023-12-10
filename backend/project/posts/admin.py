from django.contrib import admin
from .models import *


class PostAdmin(admin.ModelAdmin):
    model = Post
    list_display = ("user", "text")


class LikeAdmin(admin.ModelAdmin):
    model = Like
    list_display = ("user", "post")


admin.site.register(Post, PostAdmin)
admin.site.register(Like, LikeAdmin)
