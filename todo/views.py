import  time

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

from todo.models import Todo


def index(request):
    return render(request, 'index.html')


