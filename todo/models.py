import time

from django.db import models


class Todo(models.Model):
    task = models.TextField('任务名称')
    created_time = models.IntegerField('创建时间')
    updated_time = models.IntegerField('更新时间')
    is_deleted = models.BooleanField('是否删除')

    class Meta:
        db_table = 'todo'

    @classmethod
    def all(cls):
        todo_list = Todo.objects.all()
        l = [todo.json() for todo in todo_list]
        d = dict(todo_list=1)
        return d

    @classmethod
    def new(cls, form):
        d = {
            'task': form.get('task', ''),
            'created_time': int(time.time()),
            'updated_time': int(time.time()),
            'is_deleted': 0,
        }
        todo = Todo.objects.create(**d)
        return todo

    @classmethod
    def update(cls, form):
        todo = cls.objects.get(id=form['id'])
        todo.task = form.get('task', '')
        todo.updated_time = int(time.time())
        todo.save()
        return todo

    @classmethod
    def delete_by_id(cls, id):
        todo = cls.objects.get(id=id)
        todo.delete()
        return todo


    @property
    def local_created_time(self):
        format = '%Y/%m/%d %H:%M:%S'
        value = time.localtime(self.created_time)
        dt = time.strftime(format, value)
        return dt

    @property
    def local_updated_time(self):
        format = '%Y/%m/%d %H:%M:%S'
        value = time.localtime(self.updated_time)
        dt = time.strftime(format, value)
        return dt

    def json(self):
        d = {
            'id': self.id,
            'task': self.task,
            'created_time': self.local_created_time,
            'updated_time': self.local_updated_time,
        }
        return d