import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideInfrastructure } from './core/infrastructure/providers';
import { appEffects, appReducers } from './store';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular Core
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimations(),

    // NgRx Store
    provideStore(appReducers),
    provideEffects(appEffects),

    // NgRx DevTools (solo en desarrollo)
    provideStoreDevtools({
      maxAge: 25, // Retiene los últimos 25 estados
      logOnly: !isDevMode(), // Restringir extensión a solo log en producción
      autoPause: true, // Pausa la grabación de acciones cuando la extensión no está abierta
      trace: false, // Si es true, incluye stack trace para cada acción
      traceLimit: 75, // Máximo de stack trace frames a almacenar
      connectInZone: true, // Conectar en zone.js para mejor rendimiento
    }),

    // Infrastructure
    provideInfrastructure(),
  ],
};
