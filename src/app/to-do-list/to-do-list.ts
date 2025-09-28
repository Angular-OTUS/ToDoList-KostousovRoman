import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { Task } from '../app';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Title } from '../shared/title/title';
import { TaskListService } from '../services/task-list';
import { ToastService } from '../services/toast';
import { ToDoCreateItem } from '../to-do-create-item/to-do-create-item';
import { TaskApiService } from '../services/task-api';

@Component({
  selector: 'app-to-do-list',
  imports: [
    MatIcon,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ToDoListItem,
    MatProgressSpinnerModule,
    Title,
    ToDoCreateItem,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  protected readonly taskListService = inject(TaskListService);
  protected readonly taskApiService = inject(TaskApiService);
  protected readonly toastService = inject(ToastService);

  protected currentPage = signal(1);
  protected pageSize = signal(3);
  protected get totalPages() {
    return Math.ceil(this.getFilteredTasks().length / this.pageSize());
  }

  protected isLoading = signal(true);
  protected selectedItemId = signal<Task['id'] | null>(null);
  protected editTitleId = signal<Task['id'] | null>(null);

  protected filter = signal<Task['status'] | 'all'>('all');

  ngOnInit() {
    this.fetchTasks();
  }

  protected get tasks() {
    return this.taskListService.getTasks();
  }

  fetchTasks() {
    this.isLoading.set(true);
    this.taskApiService.getTasks().subscribe((tasks: Task[]) => {
      this.taskListService.setTasks(tasks);
      this.isLoading.set(false);
    });
  }

  protected deleteTask(id: Task['id']) {
    this.taskApiService.deleteTask(id).subscribe(() => {
      this.fetchTasks();
      this.toastService.add({ message: `Task ${id} deleted`, type: 'success' });
    });
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
    return this.getFilteredTasks().slice((page - 1) * pageSize, page * pageSize);
  }

  protected getFilteredTasks() {
    if (this.filter() === 'all') {
      return this.tasks;
    }
    return this.tasks.filter((t) => {
      return t.status === this.filter();
    });
  }

  protected selectItem(id: Task['id']) {
    if (this.selectedItemId() === id) {
      this.selectedItemId.set(null);
      return;
    }
    this.selectedItemId.set(id);
  }

  protected setEditTitleId(id: Task['id'] | null) {
    if (this.editTitleId() === id) {
      this.editTitleId.set(null);
      return;
    }
    this.editTitleId.set(id);
  }
}
