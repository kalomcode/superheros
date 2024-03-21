import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'superheroes',
    loadChildren: () => import('./features/superheroes/superheroes.routes').then(m => m.routes)
  },
  {
    path: '404',
    loadComponent: () => import('./core/pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
  {
    path: '',
    redirectTo: 'superheroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
