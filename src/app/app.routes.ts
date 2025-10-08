import { Routes } from '@angular/router';
import { ToDoViewItem } from './to-do-view-item/to-do-view-item';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadComponent: () => import('./to-do-list/to-do-list').then((m) => m.ToDoList),
    children: [
      {
        path: ':id',
        component: ToDoViewItem,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
