import { ChangeDetectionStrategy, Component, inject, input, model, signal } from '@angular/core';
import { Button } from '../shared/button/button';
import { FormsModule } from '@angular/forms';
import { TaskListService } from '../services/task-list';
import { ToastService } from '../services/toast';
import { Task } from '../app';

@Component({
  selector: 'app-to-do-create-item',
  imports: [Button, FormsModule],
  templateUrl: './to-do-create-item.html',
  styleUrl: './to-do-create-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoCreateItem {
  inputValue = model('');
  taskListService = inject(TaskListService);
  toastService = inject(ToastService);

  protected validateInputValue(): boolean {
    return !this.inputValue().trim();
  }

  protected addTask(): void {
    const task = {
      name: this.inputValue(),
      status: 'todo',
      description: '',
    } as Task;

    this.taskListService.addTask(task);

    this.inputValue.set('');
  }
}
