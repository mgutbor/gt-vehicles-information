import { MakeVehicleType, VehicleMake, VehicleModel } from '@app/core/domain/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

/**
 * Actions para el feature de Make Detail
 */
export const MakeDetailActions = createActionGroup({
  source: 'Make Detail',
  events: {
    // Load Make Details
    'Load Make Detail': props<{ makeId: number }>(),
    'Load Make Detail Success': props<{ make: VehicleMake }>(),
    'Load Make Detail Failure': props<{ error: string }>(),

    // Load Vehicle Types
    'Load Vehicle Types': props<{ makeId: number }>(),
    'Load Vehicle Types Success': props<{ vehicleTypes: MakeVehicleType[] }>(),
    'Load Vehicle Types Failure': props<{ error: string }>(),

    // Load Models
    'Load Models': props<{ makeId: number }>(),
    'Load Models Success': props<{ models: VehicleModel[] }>(),
    'Load Models Failure': props<{ error: string }>(),

    // Load Models by Year
    'Load Models By Year': props<{ makeId: number; year: number }>(),
    'Load Models By Year Success': props<{ models: VehicleModel[] }>(),
    'Load Models By Year Failure': props<{ error: string }>(),

    // Clear state
    'Clear Make Detail': emptyProps(),
  },
});
