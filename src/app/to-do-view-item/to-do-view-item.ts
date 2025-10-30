import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Task } from '../app';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TaskListService } from '../services/task-list';

@Component({
  selector: 'app-to-do-view-item',
  imports: [MatIcon, MatSelectModule, FormsModule],
  templateUrl: './to-do-view-item.html',
  styleUrl: './to-do-view-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoViewItem {
  private readonly taskListService = inject(TaskListService);
  private readonly router = inject(Router);

  protected id = input.required<Task['id']>();

  task() {
    return this.taskListService.getTaskById(this.id());
  }

  protected changeDescription(event: Event): void {
    if (!this.task()) return;
    this.task()!.description = (event.target as HTMLTextAreaElement).value;

    this.taskListService.updateTask(this.task()!);
  }

  protected changeStatus(status: Task['status']): void {
    if (!this.task()) return;
    this.task()!.status = status;

    this.taskListService.updateTask(this.task()!);
  }

  protected close() {
    this.router.navigate(['/']);
  }
}
