import { inject, Injectable } from '@angular/core';
import { Task } from '../app';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  deleteTask(id: Task['id']) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
