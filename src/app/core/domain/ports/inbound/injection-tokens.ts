import { InjectionToken } from '@angular/core';
import { GetMakeByIdUseCase, GetMakesUseCase, SearchMakesUseCase } from './get-makes.usecase';
import { GetModelsForYearUseCase, GetModelsUseCase } from './get-models.usecase';
import { GetVehicleTypesUseCase } from './get-vehicle-types.usecase';

/**
 * Tokens de inyección para casos de uso
 * Permiten implementaciones intercambiables
 */

export const GET_MAKES_USE_CASE = new InjectionToken<GetMakesUseCase>('GetMakesUseCase');

export const SEARCH_MAKES_USE_CASE = new InjectionToken<SearchMakesUseCase>('SearchMakesUseCase');

export const GET_MAKE_BY_ID_USE_CASE = new InjectionToken<GetMakeByIdUseCase>('GetMakeByIdUseCase');

export const GET_VEHICLE_TYPES_USE_CASE = new InjectionToken<GetVehicleTypesUseCase>(
  'GetVehicleTypesUseCase'
);

export const GET_MODELS_USE_CASE = new InjectionToken<GetModelsUseCase>('GetModelsUseCase');

export const GET_MODELS_FOR_YEAR_USE_CASE = new InjectionToken<GetModelsForYearUseCase>(
  'GetModelsForYearUseCase'
);
