import { Component, inject } from '@angular/core';
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

  filteredTasks(status: Task['status']): Observable<Task[]> {
    return this.taskListService.tasks.pipe(
      map((tasks) => tasks.filter((task) => task.status === status))
    );
  }

  ngOnInit() {
    this.taskListService.fetchTasks();
  }
}
