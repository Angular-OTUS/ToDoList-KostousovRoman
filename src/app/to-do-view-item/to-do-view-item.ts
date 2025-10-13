import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../app';
import { TaskApiService } from '../services/task-api';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-to-do-view-item',
  imports: [MatIcon],
  templateUrl: './to-do-view-item.html',
  styleUrl: './to-do-view-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoViewItem implements OnInit, OnChanges {
  private readonly taskApiService = inject(TaskApiService);
  private readonly router = inject(Router);

  protected id = input.required<Task['id']>();

  protected task = signal<Task | null>(null);

  ngOnInit(): void {
    this.getTaskById(this.id());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.getTaskById(changes['id'].currentValue);
    }
  }

  protected changeDescription(event: Event): void {
    if (!this.task()) return;
    this.task()!.description = (event.target as HTMLTextAreaElement).value;
    this.taskApiService.updateTask(this.task()!).subscribe((task) => {
      this.task.set(task);
    });
  }

  protected getTaskById(id: Task['id']): void {
    this.taskApiService
      .getTaskById(id)
      .pipe(
        catchError(() => {
          this.close();
          return [];
        })
      )
      .subscribe((task) => {
        this.task.set(task);
      });
  }

  protected close() {
    this.router.navigate(['tasks']);
  }
}
