import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Task } from '../app';
import { Title } from '../shared/title/title';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-to-do-list-item',
  imports: [MatCheckbox, MatIcon, MatIconModule, Title, FormsModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  protected readonly toastService = inject(ToastService);

  task = input.required<Task>();
  remove = output<Task['id']>();
  select = output<Task['id']>();
  setEditTitleId = output<Task['id'] | null>();
  selected = input(false);
  editTitle = model<boolean>(false);

  protected taskTitle = signal('');

  protected toggleDone(task: Task) {
    task.done = !task.done;
  }

  protected changeDescription(event: Event) {
    this.task().description = (event.target as HTMLTextAreaElement).value;
  }

  protected saveTitle() {
    this.task().name = this.taskTitle();
    this.editTitle.set(false);
    this.taskTitle.set('');
    this.toastService.add({ message: `Task title changed`, type: 'success' });
  }
}
