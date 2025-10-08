import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private baseUrl = 'http://localhost:3000';
  http = inject(HttpClient);

  tasks = signal<Task[]>([]);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  getTaskById(id: Task['id']): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    // @ts-ignore
    task.id = task.id.toString();
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/tasks/${task.id}`, task);
  }

  deleteTask(id: Task['id']): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/tasks/${id}`);
  }
}
