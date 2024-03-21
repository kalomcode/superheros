import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'superheros',
    loadChildren: () => import('./features/superheros/superheros.routes').then(m => m.routes)
  },
  {
    path: '404',
    loadComponent: () => import('./core/pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
  {
    path: '',
    redirectTo: 'superheros',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
