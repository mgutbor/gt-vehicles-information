import { VehicleMake } from '@app/core/domain/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

/**
 * Actions para el feature de Makes
 * Siguiendo el patrón Action/Reducer/Effect de NgRx
 */
export const MakesActions = createActionGroup({
  source: 'Makes',
  events: {
    // Load all makes
    'Load Makes': emptyProps(),
    'Load Makes Success': props<{ makes: VehicleMake[] }>(),
    'Load Makes Failure': props<{ error: string }>(),

    // Search makes
    'Search Makes': props<{ query: string }>(),
    'Search Makes Success': props<{ makes: VehicleMake[] }>(),
    'Search Makes Failure': props<{ error: string }>(),

    // Clear search
    'Clear Search': emptyProps(),

    // Select make
    'Select Make': props<{ makeId: number }>(),
    'Deselect Make': emptyProps(),
  },
});
