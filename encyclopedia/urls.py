from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("search/", views.search, name="search"),
    path("random/", views.random_page, name="random_page"),
    path("editor/", views.editor, name="editor"),
    path("wiki/<str:title>", views.wiki, name="entry-detail")
]
