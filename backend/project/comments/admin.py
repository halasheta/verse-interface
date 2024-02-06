from django.contrib import admin
from .models import *

class CommLikeAdmin(admin.ModelAdmin):
    model = CommLike
    list_display = ("user", "comment")

class CommDislikeAdmin(admin.ModelAdmin):
    model = CommDislike
    list_display = ("user", "comment")
    
class CommentAdmin(admin.ModelAdmin):
    model = Comment
    list_display = ("text", "user", "post", "parent", "date_created")
    
admin.site.register(Comment, CommentAdmin)
admin.site.register(CommLike, CommLikeAdmin)
admin.site.register(CommDislike, CommDislikeAdmin)
