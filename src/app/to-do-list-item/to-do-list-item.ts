import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Task } from '../app';
import { Title } from '../shared/title/title';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../services/toast';
import { TaskApiService } from '../services/task-api';
import { TaskListService } from '../services/task-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list-item',
  imports: [MatCheckbox, MatIcon, MatIconModule, Title, FormsModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  protected readonly toastService = inject(ToastService);
  protected readonly taskListService = inject(TaskListService);
  protected readonly taskApiService = inject(TaskApiService);
  protected readonly router = inject(Router);

  task = input.required<Task>();
  remove = output<Task['id']>();
  setEditTitleId = output<Task['id'] | null>();
  editTitle = input.required<boolean>();

  protected taskTitle = signal('');

  protected toggleDone(task: Task) {
    task.status = task.status === 'inProgress' ? 'completed' : 'inProgress';
    this.taskApiService.updateTask(task).subscribe();
  }

  protected saveTitle() {
    this.task().name = this.taskTitle();
    this.taskTitle.set('');
    this.setEditTitleId.emit(null);
    this.taskApiService.updateTask(this.task()).subscribe(() => {
      this.toastService.add({ message: `Task title changed`, type: 'success' });
    });
  }

  protected cancelEditing() {
    this.setEditTitleId.emit(null);
    this.taskTitle.set('');
  }

  protected selectItem(id: Task['id']) {
    this.router.navigate(['tasks', id]);
  }
}
