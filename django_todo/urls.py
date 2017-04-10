"""django_todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url

from todo import views as todo_views
from todo import api as api_todo


urlpatterns = [
    url(r'^$', todo_views.index, name='index'),
    url(r'^api/todo/all', api_todo.all, name='api_todo_all'),
    url(r'^api/todo/add', api_todo.add, name='api_todo_add'),
    url(r'^api/todo/update', api_todo.update, name='api_todo_update'),
    url(r'^api/todo/delete', api_todo.delete, name='api_todo_delete'),
]