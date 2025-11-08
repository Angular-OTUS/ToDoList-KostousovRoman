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

  protected icons = new Map<ToastType['type'], string>([
    ['success', 'check'],
    ['warning', 'warning'],
    ['error', 'error'],
  ]);
}
