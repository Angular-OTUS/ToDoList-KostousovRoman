import { Injectable } from '@angular/core';
import { ToastType } from '../app';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: ToastType[] = [];
  private timeout = 5000;

  add(toast: ToastType) {
    toast.id = Math.max(0, ...this.toasts.map((t) => t?.id || 1)) + 1;
    this.toasts.push(toast);
    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== toast.id);
    }, this.timeout);
  }

  getToasts() {
    return this.toasts;
  }
}
