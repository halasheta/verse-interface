from django.contrib import admin
from .models import *
from .models import *

class PostAdmin(admin.ModelAdmin):
    model = Post
    list_display = ("text", "user", "date_created")

class PostLikeAdmin(admin.ModelAdmin):
    model = PostLike
    list_display = ("user", "post")

class PostDislikeAdmin(admin.ModelAdmin):
    model = PostDislike
    list_display = ("user", "post")
    
admin.site.register(PostLike, PostLikeAdmin)
admin.site.register(PostDislike, PostDislikeAdmin)
admin.site.register(Post, PostAdmin)

