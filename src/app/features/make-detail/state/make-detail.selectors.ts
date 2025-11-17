import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MakeDetailState, modelsAdapter, vehicleTypesAdapter } from './make-detail.reducer';

/**
 * Feature selector
 */
export const selectMakeDetailState = createFeatureSelector<MakeDetailState>('makeDetail');

/**
 * Make selectors
 */
export const selectCurrentMake = createSelector(
  selectMakeDetailState,
  (state) => state.currentMake
);

export const selectMakeDetailLoadingState = createSelector(
  selectMakeDetailState,
  (state) => state.loadingState
);

export const selectMakeDetailError = createSelector(selectMakeDetailState, (state) => state.error);

/**
 * Vehicle Types selectors
 */
export const selectVehicleTypesState = createSelector(
  selectMakeDetailState,
  (state) => state.vehicleTypes
);

const { selectAll: selectAllVehicleTypesFromAdapter } =
  vehicleTypesAdapter.getSelectors(selectVehicleTypesState);

export const selectAllVehicleTypes = selectAllVehicleTypesFromAdapter;

export const selectVehicleTypesLoading = createSelector(
  selectVehicleTypesState,
  (state) => state.loading
);

export const selectVehicleTypesError = createSelector(
  selectVehicleTypesState,
  (state) => state.error
);

/**
 * Models selectors
 */
export const selectModelsState = createSelector(selectMakeDetailState, (state) => state.models);

const { selectAll: selectAllModelsFromAdapter } = modelsAdapter.getSelectors(selectModelsState);

export const selectAllModels = selectAllModelsFromAdapter;

export const selectModelsLoading = createSelector(selectModelsState, (state) => state.loading);

export const selectModelsError = createSelector(selectModelsState, (state) => state.error);

export const selectSelectedYear = createSelector(selectModelsState, (state) => state.selectedYear);

export const selectSelectedVehicleTypeId = createSelector(
  selectModelsState,
  (state) => state.selectedVehicleTypeId
);

/**
 * Combined ViewModel selector
 */
export const selectMakeDetailViewModel = createSelector(
  selectCurrentMake,
  selectMakeDetailLoadingState,
  selectAllVehicleTypes,
  selectVehicleTypesLoading,
  selectAllModels,
  selectModelsLoading,
  selectSelectedYear,
  selectSelectedVehicleTypeId,
  selectMakeDetailError,
  (make, loadingState, vehicleTypes, typesLoading, models, modelsLoading, selectedYear, selectedVehicleTypeId, error) => ({
    make,
    loadingState,
    vehicleTypes,
    typesLoading,
    models,
    modelsLoading,
    selectedYear,
    selectedVehicleTypeId,
    error,
    hasVehicleTypes: vehicleTypes.length > 0,
    hasModels: models.length > 0,
    isLoading: typesLoading || modelsLoading,
  })
);
