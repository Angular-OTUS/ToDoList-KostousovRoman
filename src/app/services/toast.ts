import { Injectable, signal } from '@angular/core';
import { ToastType } from '../app';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toasts = signal<ToastType[]>([]);
  private timeout = 5000;

  add(toast: ToastType) {
    toast.id = Math.max(0, ...this.toasts().map((t) => t?.id || 1)) + 1;
    this.toasts.update((t) => [...t, toast]);
    setTimeout(() => {
      this.toasts.update((t) => t.filter((t) => t.id !== toast.id));
    }, this.timeout);
  }
}
