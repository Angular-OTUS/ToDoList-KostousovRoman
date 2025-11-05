import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../app';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  private readonly baseUrl = 'http://localhost:3000';
  protected readonly http = inject(HttpClient);
  private tasks$ = new BehaviorSubject<Task[]>([]);

  isLoading = signal(false);

  public get tasks() {
    return this.tasks$.asObservable();
  }

  fetchTasks() {
    this.isLoading.set(true);
    this.http.get<Task[]>(`${this.baseUrl}/tasks`).subscribe((tasks) => {
      this.tasks$.next(tasks);
      this.isLoading.set(false);
    });
  }

  getTaskById(id: Task['id']): Task | null {
    return this.tasks$.value.find((task) => task.id === id) || null;
  }

  updateTask(task: Task) {
    this.http.patch<Task>(`${this.baseUrl}/tasks/${task.id}`, task).subscribe((task) => {
      this.tasks$.next(this.tasks$.value.map((t) => (t.id === task.id ? task : t)));
    });
  }

  setTasks(tasks: Task[]) {
    this.tasks$.next(tasks);
  }

  addTask(task: Task) {
    // @ts-ignore
    task.id = (Math.max(0, ...this.tasks$.value.map((t) => t.id)) + 1).toString();
    this.http.post<Task>(`${this.baseUrl}/tasks`, task).subscribe((task) => {
      this.tasks$.next([...this.tasks$.value, task]);
    });
  }

  deleteTask(id: Task['id']) {
    this.http.delete<Task>(`${this.baseUrl}/tasks/${id}`).subscribe(() => {
      this.tasks$.next(this.tasks$.value.filter((task) => task.id !== id));
    });
  }
}
