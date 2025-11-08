import { Component, inject, signal } from '@angular/core';
import { TaskListService } from '../services/task-list';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { Task } from '../app';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [ToDoListItem, AsyncPipe],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  protected readonly taskListService = inject(TaskListService);

  protected taskStatuses: Task['status'][] = ['todo', 'inProgress', 'completed'];

  protected filteredTasks = new Map<Task['status'], Observable<Task[]>>(
    this.taskStatuses.map((status) => [
      status,
      this.taskListService.tasks.pipe(
        map((tasks) => tasks.filter((task) => task.status === status))
      ),
    ])
  );

  ngOnInit() {
    this.taskListService.fetchTasks();
  }
}
