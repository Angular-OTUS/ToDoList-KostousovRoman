import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Task } from '../app';

@Component({
  selector: 'app-to-do-list-item',
  imports: [MatCheckbox, MatIcon, MatIconModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  task = input.required<Task>();
  remove = output<Task['id']>();

  protected toggleDone(task: Task) {
    task.done = !task.done;
  }
}
