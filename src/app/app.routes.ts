import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';


export const routes: Routes = [
{ path: '', loadComponent: () => import('./pages/login/login.component') },
{
    path: 'recepcao',
    loadComponent: () =>
      import('./pages/recepcao/recepcao.component').then(
        m => m.RecepcaoComponent
      )
  },
  {
    path: 'chamador',
    loadComponent: () =>
      import('./pages/chamador/chamador.component').then(
        m => m.ChamadorComponent
      )
  },
{ path: '**', redirectTo: '' }
];