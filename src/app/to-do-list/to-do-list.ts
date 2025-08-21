import { Component } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-to-do-list',
  imports: [
    MatCheckbox,
    MatIcon,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList {
  protected tasks: Task[] = [
    {
      name: 'Buy milk',
      done: false,
    },
    {
      name: 'Buy bread',
      done: false,
    },
    {
      name: 'Make ToDo app',
      done: true,
    },
  ];

  protected inputValue = '';

  protected deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  protected toggleDone(task: Task) {
    task.done = !task.done;
  }

  protected addTask() {
    this.tasks.push({
      name: this.inputValue,
      done: false,
    });
    this.inputValue = '';
  }
}

type Task = {
  name: string;
  done: boolean;
};
