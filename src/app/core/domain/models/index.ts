export type { VehicleMake, VehicleMakeDetails } from './vehicle-make.model';
export type { VehicleModel, VehicleModelDetails } from './vehicle-model.model';
export type { MakeVehicleType, VehicleType } from './vehicle-type.model';

// ============================================
// TIPOS AUXILIARES DEL DOMINIO
// ============================================

/**
 * Estado de carga genérico para operaciones asíncronas
 * Útil para el patrón MVVM
 */
export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Tipo genérico para respuestas con estado de carga
 */
export interface LoadableData<T> {
  readonly data: T | null;
  readonly state: LoadingState;
  readonly error: string | null;
}

/**
 * Tipo para paginación (si se necesita en el futuro)
 */
export interface PaginationParams {
  readonly page: number;
  readonly pageSize: number;
}

/**
 * Tipo para filtros de búsqueda
 */
export interface SearchFilter {
  readonly query: string;
  readonly caseSensitive?: boolean;
}

/**
 * Tipo para ordenamiento
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortParams {
  readonly field: string;
  readonly order: SortOrder;
}
