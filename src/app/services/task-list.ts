import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  private readonly baseUrl = 'http://localhost:3000';
  protected readonly http = inject(HttpClient);

  isLoading = signal(false);

  tasks = signal<Task[]>([]);

  fetchTasks() {
    this.isLoading.set(true);
    this.http.get<Task[]>(`${this.baseUrl}/tasks`).subscribe((tasks) => {
      this.tasks.set(tasks);
      this.isLoading.set(false);
    });
  }

  getTaskById(id: Task['id']): Task | null {
    return this.tasks().find((task) => task.id === id) || null;
  }

  updateTask(task: Task) {
    this.http.patch<Task>(`${this.baseUrl}/tasks/${task.id}`, task).subscribe((task) => {
      this.tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? task : t)));
    });
  }

  setTasks(tasks: Task[]) {
    this.tasks.set(tasks);
  }

  addTask(task: Task) {
    // @ts-ignore
    task.id = task.id.toString();
    this.http.post<Task>(`${this.baseUrl}/tasks`, task).subscribe((task) => {
      this.tasks.update((tasks) => [...tasks, task]);
    });
  }

  deleteTask(id: Task['id']) {
    this.http.delete<Task>(`${this.baseUrl}/tasks/${id}`).subscribe(() => {
      this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    });
  }
}
