import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'list', 
    loadComponent: () => import('./pages/superheros-list/superheros-list.component').then(m => m.superherosListComponent)
  },
  {
    path: 'edit/:id', 
    loadComponent: () => import('./pages/superhero-edit/superhero-edit.component').then(m => m.superheroEditComponent)
  },
  {
    path: 'new', 
    loadComponent: () => import('./pages/superhero-edit/superhero-edit.component').then(m => m.superheroEditComponent)
  },
  { path: '**', redirectTo: 'list'}
]