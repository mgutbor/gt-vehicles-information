import { InjectionToken } from '@angular/core';
import { CacheRepository } from './cache.repository';
import { VehicleRepository } from './vehicle.repository';

/**
 * Tokens para inyección de dependencias
 * Permiten inyectar implementaciones concretas sin conocerlas
 * Siguiendo el principio de Inversión de Dependencias (SOLID)
 */

export const VEHICLE_REPOSITORY = new InjectionToken<VehicleRepository>(
  'VehicleRepository',
  {
    providedIn: 'root',
    factory: () => {
      throw new Error('VehicleRepository must be provided');
    },
  }
);

export const CACHE_REPOSITORY = new InjectionToken<CacheRepository>(
  'CacheRepository',
  {
    providedIn: 'root',
    factory: () => {
      throw new Error('CacheRepository must be provided');
    },
  }
);
