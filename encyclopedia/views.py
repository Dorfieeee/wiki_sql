from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponseBadRequest, HttpResponseNotFound, HttpResponse
from django.views.decorators.csrf import csrf_protect
from markdown2 import Markdown
from . import util
import random

from urllib.parse import quote

markdowner = Markdown()

def index(request, **kwargs):  
    if 'entries' in kwargs:
        entries = kwargs['entries']
        title = request.GET.get('q')
    else:
        entries = util.list_entries()
        title = None  

    context = {
        "entries": [entry.replace('_', ' ') for entry in entries],
        "title": title,
    }

    return render(request, "encyclopedia/index.html", context)


def wiki(request, title):
    content = util.get_entry(title)
    # if content == None => entry was not found 
    if content is None:
        content_list = [entry for entry in util.list_entries() if title in entry]
        if content_list:
            return index(request, entries=content_list)
        else:
            return render(request, "encyclopedia/detail.html", {'title': title})

    context = {
        "content": markdowner.convert(content),
        "title": title.replace('_', ' '),
    }
    
    return render(request, "encyclopedia/detail.html", context)


def search(request):
    if request.method == 'GET':
        if request.GET.get('q'):
            title = request.GET.get('q').replace(' ', '_')
            return wiki(request, title)
        else:
            return HttpResponseRedirect('/')        

    return HttpResponseRedirect('/')


def random_page(request):    
    list = util.list_entries()
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
            title = request.GET.get('title')
            content = util.get_entry(title)
            # if content != None => entry was found 
            if content is None:   
                content = ''

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

        util.save_entry(title, content)


        return HttpResponseRedirect('/wiki/%s' % title)