from django.urls import path

from .views import ListChaptersView, ListVersesView, ViewVerseView

app_name = 'quran'

urlpatterns = [
    path('all/', ListChaptersView.as_view()),
    path('<int:num>/verses/', ListVersesView.as_view()),
    path('<int:chapter_num>/verse/<int:num>', ViewVerseView.as_view()),
]
