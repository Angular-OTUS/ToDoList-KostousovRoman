import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

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
    RouterOutlet,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList {
  protected readonly taskListService = inject(TaskListService);
  protected readonly toastService = inject(ToastService);
  protected readonly router = inject(Router);
  protected readonly activatedRoute = inject(ActivatedRoute);

  protected currentPage = signal(1);
  protected pageSize = signal(3);
  protected totalPages = computed(() => {
    return Math.ceil(this.getFilteredTasks().length / this.pageSize());
  });

  protected isLoading = this.taskListService.isLoading;
  protected editTitleId = signal<Task['id'] | null>(null);
  protected selectedId = signal<Task['id'] | null>(null);

  protected filter = signal<Task['status'] | 'all'>('all');

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskListService.fetchTasks();
  }

  protected deleteTask(id: Task['id']): void {
    this.taskListService.deleteTask(id);
  }

  protected previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((v) => v - 1);
    } else {
      this.toastService.add({ message: 'Minimum page reached', type: 'warning' });
    }
  }

  protected nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((v) => v + 1);
    } else {
      this.toastService.add({ message: 'Maximum page reached', type: 'warning' });
    }
  }

  protected getSlicedTasks(): Task[] {
    const page = this.currentPage();
    const pageSize = this.pageSize();
    return this.getFilteredTasks().slice((page - 1) * pageSize, page * pageSize);
  }

  protected getFilteredTasks(): Task[] {
    if (this.filter() === 'all') {
      return this.taskListService.tasks();
    }
    return this.taskListService.tasks().filter((t) => {
      return t.status === this.filter();
    });
  }

  protected setEditTitleId(id: Task['id'] | null): void {
    if (this.editTitleId() === id) {
      this.editTitleId.set(null);
      return;
    }
    this.editTitleId.set(id);
  }
}
