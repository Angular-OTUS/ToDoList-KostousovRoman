import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { Task } from '../app';
import { Button } from '../shared/button/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Title } from '../shared/title/title';
import { TaskListService } from '../services/task';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-to-do-list',
  imports: [
    MatIcon,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ToDoListItem,
    Button,
    MatProgressSpinnerModule,
    Title,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  protected readonly taskListService = inject(TaskListService);
  protected readonly toastService = inject(ToastService);
  protected inputValue = signal('');

  protected currentPage = signal(1);
  protected pageSize = signal(3);
  protected get totalPages() {
    return Math.ceil(this.tasks.length / this.pageSize());
  }

  protected isLoading = signal(true);
  protected selectedItemId = signal<Task['id'] | null>(null);

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  protected get tasks() {
    return this.taskListService.getTasks();
  }

  protected addTask() {
    this.taskListService.addTask({
      id: Math.max(...this.tasks.map((t) => t.id)) + 1,
      name: this.inputValue(),
      done: false,
    });

    this.inputValue.set('');

    this.toastService.add({ message: 'Task added', type: 'success' });
  }

  protected deleteTask(id: Task['id']) {
    this.taskListService.deleteTask(id);
    this.toastService.add({ message: `Task ${id} deleted`, type: 'success' });
  }

  protected previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((v) => v - 1);
    } else {
      this.toastService.add({ message: 'Minimum page reached', type: 'warning' });
    }
  }

  protected nextPage() {
    if (this.currentPage() < this.totalPages) {
      this.currentPage.update((v) => v + 1);
    } else {
      this.toastService.add({ message: 'Maximum page reached', type: 'warning' });
    }
  }

  protected getSlicedTasks() {
    const page = this.currentPage();
    const pageSize = this.pageSize();
    return this.tasks.slice((page - 1) * pageSize, page * pageSize);
  }

  protected validateInputValue() {
    return !this.inputValue().trim();
  }

  protected selectItem(id: Task['id']) {
    if (this.selectedItemId() === id) {
      this.selectedItemId.set(null);
      return;
    }
    this.selectedItemId.set(id);
  }
}
