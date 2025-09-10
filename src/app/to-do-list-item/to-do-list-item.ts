import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Task } from '../app';
import { Title } from '../shared/title/title';

@Component({
  selector: 'app-to-do-list-item',
  imports: [MatCheckbox, MatIcon, MatIconModule, Title],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  task = input.required<Task>();
  remove = output<Task['id']>();
  select = output<Task['id']>();
  selected = input(false);

  protected toggleDone(task: Task) {
    task.done = !task.done;
  }

  protected changeDescription(event: Event) {
    this.task().description = (event.target as HTMLTextAreaElement).value;
  }
}
