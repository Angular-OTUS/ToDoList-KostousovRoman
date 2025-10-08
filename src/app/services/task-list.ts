import { Injectable, signal } from '@angular/core';
import { Task } from '../app';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  tasks = signal<Task[]>([]);

  getTaskById(id: Task['id']): Task | null {
    return this.tasks().find((task) => task.id === id) || null;
  }

  setTasks(tasks: Task[]) {
    this.tasks.set(tasks);
  }

  addTask(task: Task) {
    this.tasks().push(task);
  }

  deleteTask(id: Task['id']) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
