import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'timer',
    loadComponent: () => import('./pages/timer/timer.component').then(m => m.TimerComponent)
  },
  {
    path: 'sounds',
    loadComponent: () => import('./pages/sounds/sounds.component').then(m => m.SoundsComponent)
  },
  {
    path: '**',
    redirectTo: 'timer'
  }
];
