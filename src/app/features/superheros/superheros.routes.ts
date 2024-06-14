import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'list', 
    loadComponent: () => import('./pages/superheros-list/superheros-list.component').then(m => m.SuperherosListComponent)
  },
  {
    path: 'edit/:id', 
    loadComponent: () => import('./pages/superhero-edit/superhero-edit.component').then(m => m.SuperheroEditComponent)
  },
  {
    path: 'new', 
    loadComponent: () => import('./pages/superhero-edit/superhero-edit.component').then(m => m.SuperheroEditComponent)
  },
  { path: '**', redirectTo: 'list'}
]