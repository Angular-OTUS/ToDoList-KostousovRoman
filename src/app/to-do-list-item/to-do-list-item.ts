import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Task } from '../app';
import { Title } from '../shared/title/title';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../services/toast';
import { TaskListService } from '../services/task-list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-to-do-list-item',
  imports: [MatIcon, MatIconModule, Title, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  protected readonly toastService = inject(ToastService);
  protected readonly taskListService = inject(TaskListService);
  protected readonly router = inject(Router);

  task = input.required<Task>();
  setEditTitleId = output<Task['id'] | null>();
  editTitle = input<boolean>();

  protected taskTitle = signal('');

  protected saveTitle(): void {
    this.task().name = this.taskTitle();
    this.taskTitle.set('');
    this.setEditTitleId.emit(null);

    this.taskListService.updateTask(this.task());
  }

  protected cancelEditing(): void {
    this.setEditTitleId.emit(null);
    this.taskTitle.set('');
  }

  protected remove($event: Event): void {
    $event.stopPropagation();
    this.taskListService.deleteTask(this.task().id);
  }
}
