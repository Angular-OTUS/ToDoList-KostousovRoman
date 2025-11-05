import { Component, inject, Injector } from '@angular/core';
import { TaskListService } from '../services/task-list';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { Task } from '../app';

@Component({
  selector: 'app-board',
  imports: [ToDoListItem],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  protected readonly taskListService = inject(TaskListService);

  protected taskStatuses: Task['status'][] = ['todo', 'inProgress', 'completed'];

  filteredTasks(status: Task['status']): Task[] {
    return this.taskListService.tasks().filter((task) => task.status === status);
  }

  ngOnInit() {
    this.taskListService.fetchTasks();
  }
}
