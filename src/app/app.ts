import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './toast/toast';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo');
}

export type Task = {
  id: number;
  name: string;
  status: 'todo' | 'inProgress' | 'completed';
  description: string;
};

export interface ToastType {
  message: string;
  type: 'success' | 'warning' | 'error';
  id?: number;
}
