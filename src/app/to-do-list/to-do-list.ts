import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { Task } from '../app';
import { Button } from '../shared/button/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-to-do-list',
  imports: [
    MatIcon,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ToDoListItem,
    Button,
    MatProgressSpinnerModule,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  protected tasks: Task[] = [
    {
      id: 1,
      name: 'Buy milk',
      done: false,
    },
    {
      id: 2,
      name: 'Buy bread',
      done: false,
    },
    {
      id: 3,
      name: 'Feed the dog',
      done: false,
    },
    {
      id: 4,
      name: 'Make ToDo app',
      done: true,
    },
  ];

  protected inputValue = signal('');

  protected currentPage = signal(1);
  protected pageSize = signal(3);
  protected get totalPages() {
    return Math.ceil(this.tasks.length / this.pageSize());
  }

  protected isLoading = signal(true);

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  protected addTask() {
    this.tasks.push({
      id: Math.max(...this.tasks.map((t) => t.id)) + 1,
      name: this.inputValue(),
      done: false,
    });
    this.inputValue.set('');
  }

  protected deleteTask(id: Task['id']) {
    this.tasks = this.tasks.filter((t: Task) => t.id !== id);
  }

  protected previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((v) => v - 1);
    }
  }

  protected nextPage() {
    if (this.currentPage() < this.totalPages) {
      this.currentPage.update((v) => v + 1);
    }
  }
}
