import { Routes } from '@angular/router';
import { ToDoViewItem } from './to-do-view-item/to-do-view-item';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'backlog',
    pathMatch: 'full',
  },
  {
    path: 'backlog',
    loadComponent: () => import('./to-do-list/to-do-list').then((m) => m.ToDoList),
    children: [
      {
        path: ':id',
        component: ToDoViewItem,
      },
    ],
  },
  {
    path: 'board',
    loadComponent: () => import('./board/board').then((m) => m.Board),
  },
  {
    path: '**',
    redirectTo: 'backlog',
  },
];
