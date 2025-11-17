import { Routes } from '@angular/router';

/**
 * Configuración de rutas de la aplicación
 * Usando lazy loading para optimizar el bundle
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'makes',
    pathMatch: 'full',
  },
  {
    path: 'makes',
    loadComponent: () =>
      import(
        './features/makes/presentation/pages/makes-page/makes-page.component'
      ).then((m) => m.MakesPageComponent),
    title: 'Vehicle Makes',
  },
  {
    path: 'makes/:id',
    loadComponent: () =>
      import(
        './features/make-detail/presentation/pages/make-detail-page/make-detail-page.component'
      ).then((m) => m.MakeDetailPageComponent),
    title: 'Make Details',
  },
  {
    path: '**',
    redirectTo: 'makes',
  },
];
