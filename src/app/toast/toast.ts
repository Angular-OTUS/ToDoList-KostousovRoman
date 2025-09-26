import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '../services/toast';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ToastType } from '../app';

@Component({
  selector: 'app-toast',
  imports: [MatIcon, MatIconModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast {
  protected readonly toastService = inject(ToastService);

  protected get toasts() {
    return this.toastService.toasts();
  }

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
