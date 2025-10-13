import { ChangeDetectionStrategy, Component, inject, input, model, signal } from '@angular/core';
import { Button } from '../shared/button/button';
import { FormsModule } from '@angular/forms';
import { TaskListService } from '../services/task-list';
import { ToastService } from '../services/toast';
import { TaskApiService } from '../services/task-api';
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
  taskApiService = inject(TaskApiService);
  toastService = inject(ToastService);

  protected get tasks() {
    return this.taskListService.tasks();
  }

  protected validateInputValue() {
    return !this.inputValue().trim();
  }

  protected addTask() {
    const task = {
      id: Math.max(...this.tasks.map((t) => t.id)) + 1,
      name: this.inputValue(),
      status: 'inProgress',
      description: '',
    } as Task;

    this.taskListService.addTask(task);
    this.taskApiService.addTask(task).subscribe(() => {
      this.toastService.add({ message: 'Task added', type: 'success' });
    });

    this.inputValue.set('');
  }
}
