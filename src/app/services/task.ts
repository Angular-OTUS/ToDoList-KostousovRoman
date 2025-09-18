import { Injectable } from '@angular/core';
import { Task } from '../app';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Buy milk',
      done: false,
      description: 'Buy milk from the store',
    },
    {
      id: 2,
      name: 'Buy bread',
      done: false,
    },
    {
      id: 3,
      name: 'Feed the dog',
      done: false,
    },
    {
      id: 4,
      name: 'Make ToDo app',
      done: true,
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
