import { LoadingState, MakeVehicleType, VehicleMake, VehicleModel } from '@app/core/domain/models';

/**
 * Interface para el ViewModel de Make Detail
 * Define la estructura de datos que consume el componente
 */
export interface MakeDetailViewModelData {
  make: VehicleMake | null;
  loadingState: LoadingState;
  vehicleTypes: MakeVehicleType[];
  typesLoading: boolean;
  models: VehicleModel[];
  modelsLoading: boolean;
  selectedYear: number | null;
  selectedVehicleTypeId: number | null;
  error: string | null;
  hasVehicleTypes: boolean;
  hasModels: boolean;
  isLoading: boolean;
}
