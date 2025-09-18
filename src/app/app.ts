import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo');
}

export type Task = {
  id: number;
  name: string;
  done: boolean;
  description?: string;
};

export type ToastType = {
  message: string;
  type: 'success' | 'warning' | 'error';
  id?: number;
};
