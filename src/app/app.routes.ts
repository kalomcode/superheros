import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'superheroes',
    loadChildren: () => import('./features/superheroes/superheroes.routes').then(m => m.routes)
  }
];
