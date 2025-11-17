import { VehicleMake } from '@app/core/domain/models';

/**
 * Interface para el ViewModel de Makes
 * Define la estructura de datos que consume el componente
 */
export interface MakesViewModelData {
  makes: VehicleMake[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  total: number;
  isEmpty: boolean;
  hasResults: boolean;
}
