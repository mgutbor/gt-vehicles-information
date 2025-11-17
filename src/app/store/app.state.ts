import { MakeDetailState, makeDetailReducer } from '@app/features/make-detail/state';
import { MakesState, makesReducer } from '@app/features/makes/state';
import { ActionReducerMap } from '@ngrx/store';

/**
 * Root State de la aplicación
 * Combina todos los feature states
 */
export interface AppState {
  makes: MakesState;
  makeDetail: MakeDetailState;
}

/**
 * Root Reducers
 * Mapa de reducers para cada feature
 */
export const appReducers: ActionReducerMap<AppState> = {
  makes: makesReducer,
  makeDetail: makeDetailReducer,
};
