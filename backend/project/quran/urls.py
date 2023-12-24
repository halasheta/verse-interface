from django.urls import path

from .views import ListChaptersView, ListVersesView, ViewVerseView, CreateChapter, CreateVerse, \
DeleteChapter, DeleteVerse, ViewChapter

app_name = 'quran'

urlpatterns = [
    path('all/', ListChaptersView.as_view()),
    path('chapter/<int:id>/', ViewChapter.as_view()),
    path('chapter/add/', CreateChapter.as_view()),
    path('chapter/del/<int:id>/', DeleteChapter.as_view()),

    path('<int:num>/verses/', ListVersesView.as_view()),
    path('verse/<int:id>/', ViewVerseView.as_view()),
    path('verse/add/', CreateVerse.as_view()),
    path('verse/del/<int:id>', DeleteVerse.as_view()),
]
