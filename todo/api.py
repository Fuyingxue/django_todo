import time
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from todo.models import Todo


@csrf_exempt
def all(request):
    todo_list = Todo.all()
    return JsonResponse(todo_list)


@csrf_exempt
def add(request):
    # json对象必须是字符串类型，不是字节类型
    # a= b'{"a":"bcde"}'  你需要如下转换方式 a.decode("utf-8")
    form = json.loads(request.body.decode('utf-8'))
    todo = Todo.new(form)
    return JsonResponse(todo.json())


@csrf_exempt
def update(request):
    # form = json.loads(request.body)
    form = json.loads(request.body.decode('utf-8'))
    todo = Todo.update(form)
    return JsonResponse(todo.json())


@csrf_exempt
def delete(request):
    id = request.GET['id']
    todo = Todo.delete_by_id(id)
    return JsonResponse(todo.json())


