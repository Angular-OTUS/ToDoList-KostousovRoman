import { inject, Injectable } from '@angular/core';
import { ToastType } from '../app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts$ = new BehaviorSubject<ToastType[]>([]);
  private timeout = 5000;

  public get toasts() {
    return this.toasts$.asObservable();
  }

  add(toast: ToastType) {
    toast.id = this.toasts$.value.length + 1;
    this.toasts$.next([...this.toasts$.value, toast]);
    setTimeout(() => {
      this.toasts$.next(this.toasts$.value.filter((t: ToastType) => t.id !== toast.id));
    }, this.timeout);
  }
}
