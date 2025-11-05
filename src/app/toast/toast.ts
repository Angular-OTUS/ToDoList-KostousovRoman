import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../services/toast';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ToastType } from '../app';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [MatIcon, MatIconModule, AsyncPipe],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast {
  protected readonly toastService = inject(ToastService);

  protected getIcon(type: ToastType['type']) {
    switch (type) {
      case 'success':
        return 'check';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
    }
  }
}
