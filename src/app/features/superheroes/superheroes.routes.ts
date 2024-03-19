import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'list', 
    loadComponent: () => import('./pages/superheroes-list/superheroes-list.component').then(m => m.SuperheroesListComponent)
  },
  {
    path: 'edit/:id', 
    loadComponent: () => import('./pages/superheroe-edit/superheroe-edit.component').then(m => m.SuperheroeEditComponent)
  },
  {
    path: 'new', 
    loadComponent: () => import('./pages/superheroe-edit/superheroe-edit.component').then(m => m.SuperheroeEditComponent)
  },
  { path: '**', redirectTo: 'list'}
]