import { provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

// Repositories
import {
  CACHE_REPOSITORY,
  VEHICLE_REPOSITORY,
} from '../../domain/ports/outbound';
import { InMemoryCacheRepository } from '../repositories/in-memory-cache.repository';
import { VehicleRepositoryImpl } from '../repositories/vehicle.repository.impl';

// Use Cases
import {
  GET_MAKE_BY_ID_USE_CASE,
  GET_MAKES_USE_CASE,
  GET_MODELS_FOR_YEAR_USE_CASE,
  GET_MODELS_USE_CASE,
  GET_VEHICLE_TYPES_USE_CASE,
  SEARCH_MAKES_USE_CASE,
} from '../../domain/ports/inbound/injection-tokens';

import {
  GetMakeByIdUseCaseImpl,
  GetMakesUseCaseImpl,
  GetModelsForYearUseCaseImpl,
  GetModelsUseCaseImpl,
  GetVehicleTypesUseCaseImpl,
  SearchMakesUseCaseImpl,
} from '../../application/use-cases';

/**
 * Providers de infraestructura
 * Configuración centralizada de inyección de dependencias
 * Siguiendo el principio de Inversión de Dependencias (SOLID)
 */
export function provideInfrastructure(): EnvironmentProviders {
  return makeEnvironmentProviders([
    // HTTP Client
    provideHttpClient(),

    // Repositories
    {
      provide: VEHICLE_REPOSITORY,
      useClass: VehicleRepositoryImpl,
    },
    {
      provide: CACHE_REPOSITORY,
      useClass: InMemoryCacheRepository,
    },

    // Use Cases - Makes
    {
      provide: GET_MAKES_USE_CASE,
      useClass: GetMakesUseCaseImpl,
    },
    {
      provide: SEARCH_MAKES_USE_CASE,
      useClass: SearchMakesUseCaseImpl,
    },
    {
      provide: GET_MAKE_BY_ID_USE_CASE,
      useClass: GetMakeByIdUseCaseImpl,
    },

    // Use Cases - Vehicle Types
    {
      provide: GET_VEHICLE_TYPES_USE_CASE,
      useClass: GetVehicleTypesUseCaseImpl,
    },

    // Use Cases - Models
    {
      provide: GET_MODELS_USE_CASE,
      useClass: GetModelsUseCaseImpl,
    },
    {
      provide: GET_MODELS_FOR_YEAR_USE_CASE,
      useClass: GetModelsForYearUseCaseImpl,
    },
  ]);
}
