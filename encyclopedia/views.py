from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponseBadRequest, HttpResponseNotFound, HttpResponse
from django.views.decorators.csrf import csrf_protect
from markdown2 import Markdown
from .models import Entry
import random

from urllib.parse import quote

markdowner = Markdown()

def index(request, **kwargs):  
    if 'entries' in kwargs:
        entries = kwargs['entries']
        title = request.GET.get('q')
    else:
        entries = Entry.objects.all()
        title = None  

    context = {
        "entries": entries,
        "title": title,
    }

    return render(request, "encyclopedia/index.html", context)


def wiki(request, title):
    entry = Entry.objects.filter(title=title)
    # if entry is empty => entry with exact title was not found
    # start search for value of title
    if not entry:
        entry_list = Entry.objects.filter(title__icontains=title)
        if entry_list:
            return index(request, entries=entry_list)
        else:
            return render(request, "encyclopedia/detail.html", {'title': title})
    else:
        entry = entry[0]

    context = {
        "content": markdowner.convert(entry.content),
        "title": entry.nice_title,
    }
    
    return render(request, "encyclopedia/detail.html", context)


def search(request):
    if request.method == 'GET':
        if request.GET.get('q'):
            title = request.GET.get('q')
            return wiki(request, title)
        else:
            return HttpResponseRedirect('/')        

    return HttpResponseRedirect('/')


def random_page(request):    
    list = Entry.objects.all()
    random_position = random.randint(0, len(list) - 1)
    title = list[random_position]

    return HttpResponseRedirect('/wiki/%s' % title)


@csrf_protect
def editor(request):
    if request.method == 'GET':
        # if user requests only editor
        if request.get_full_path() in ['/editor/', '/editor']:
            return render(request, "encyclopedia/editor.html")

        if 'title' in request.GET:
            title = request.GET.get('title').replace(' ', '_')
            entry = Entry.objects.filter(title=title)
            content = ''
            if entry:   
                content = entry[0].content
                title = entry[0].nice_title

            context = {
                "content": content,
                "title": title,
            } 
            
            return render(request, "encyclopedia/editor.html", context)
    
        # => redirect to editor page
        return HttpResponseRedirect('/editor')

    if request.method == 'POST':
        title = request.POST['title'].replace(' ', '_')
        content = request.POST['content']

        existing_entry = Entry.objects.filter(title=title)
        if existing_entry:
            existing_entry[0].content = content
            existing_entry[0].save()
        else:
            new_entry = Entry(title=title, content=content)
            new_entry.save()

        return HttpResponseRedirect('/wiki/%s' % title)