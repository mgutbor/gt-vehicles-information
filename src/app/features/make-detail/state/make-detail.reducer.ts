import { LoadingState, MakeVehicleType, VehicleMake, VehicleModel } from '@app/core/domain/models';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { MakeDetailActions } from './make-detail.actions';

/**
 * State para Vehicle Types usando Entity Adapter
 */
export interface VehicleTypesState extends EntityState<MakeVehicleType> {
  loading: boolean;
  error: string | null;
}

/**
 * State para Models usando Entity Adapter
 */
export interface ModelsState extends EntityState<VehicleModel> {
  loading: boolean;
  error: string | null;
  selectedYear: number | null;
  selectedVehicleTypeId: number | null;
}

/**
 * State principal del Make Detail
 */
export interface MakeDetailState {
  currentMake: VehicleMake | null;
  loadingState: LoadingState;
  error: string | null;
  vehicleTypes: VehicleTypesState;
  models: ModelsState;
}

/**
 * Entity Adapters
 */
export const vehicleTypesAdapter: EntityAdapter<MakeVehicleType> =
  createEntityAdapter<MakeVehicleType>({
    selectId: (type) => type.vehicleType.id,
    sortComparer: (a, b) => a.vehicleType.name.localeCompare(b.vehicleType.name),
  });

export const modelsAdapter: EntityAdapter<VehicleModel> = createEntityAdapter<VehicleModel>({
  selectId: (model) => model.id,
  sortComparer: (a, b) => a.modelName.localeCompare(b.modelName),
});

/**
 * Estado inicial
 */
export const initialState: MakeDetailState = {
  currentMake: null,
  loadingState: LoadingState.IDLE,
  error: null,
  vehicleTypes: vehicleTypesAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  models: modelsAdapter.getInitialState({
    loading: false,
    error: null,
    selectedYear: null,
    selectedVehicleTypeId: null,
  }),
};

/**
 * Reducer para Make Detail
 */
export const makeDetailReducer = createReducer(
  initialState,

  // Load Make Detail
  on(
    MakeDetailActions.loadMakeDetail,
    (state): MakeDetailState => ({
      ...state,
      loadingState: LoadingState.LOADING,
      error: null,
    })
  ),

  on(
    MakeDetailActions.loadMakeDetailSuccess,
    (state, { make }): MakeDetailState => ({
      ...state,
      currentMake: make,
      loadingState: LoadingState.SUCCESS,
      error: null,
    })
  ),

  on(
    MakeDetailActions.loadMakeDetailFailure,
    (state, { error }): MakeDetailState => ({
      ...state,
      loadingState: LoadingState.ERROR,
      error,
    })
  ),

  // Load Vehicle Types
  on(
    MakeDetailActions.loadVehicleTypes,
    (state): MakeDetailState => ({
      ...state,
      vehicleTypes: {
        ...state.vehicleTypes,
        loading: true,
        error: null,
      },
    })
  ),

  on(
    MakeDetailActions.loadVehicleTypesSuccess,
    (state, { vehicleTypes }): MakeDetailState => ({
      ...state,
      vehicleTypes: {
        ...vehicleTypesAdapter.setAll(vehicleTypes, state.vehicleTypes),
        loading: false,
        error: null,
      },
    })
  ),

  on(
    MakeDetailActions.loadVehicleTypesFailure,
    (state, { error }): MakeDetailState => ({
      ...state,
      vehicleTypes: {
        ...state.vehicleTypes,
        loading: false,
        error,
      },
    })
  ),

  // Load Models
  on(
    MakeDetailActions.loadModels,
    (state): MakeDetailState => ({
      ...state,
      models: {
        ...state.models,
        loading: true,
        error: null,
        selectedYear: null,
        selectedVehicleTypeId: null,
      },
    })
  ),

  on(
    MakeDetailActions.loadModelsSuccess,
    (state, { models }): MakeDetailState => ({
      ...state,
      models: {
        ...modelsAdapter.setAll(models, state.models),
        loading: false,
        error: null,
        selectedYear: null,
        selectedVehicleTypeId: null,
      },
    })
  ),

  on(
    MakeDetailActions.loadModelsFailure,
    (state, { error }): MakeDetailState => ({
      ...state,
      models: {
        ...state.models,
        loading: false,
        error,
      },
    })
  ),

  // Load Models by Year
  on(
    MakeDetailActions.loadModelsByYear,
    (state, { year }): MakeDetailState => ({
      ...state,
      models: {
        ...state.models,
        loading: true,
        error: null,
        selectedYear: year,
        selectedVehicleTypeId: null,
      },
    })
  ),

  on(
    MakeDetailActions.loadModelsByYearSuccess,
    (state, { models }): MakeDetailState => ({
      ...state,
      models: {
        ...modelsAdapter.setAll(models, state.models),
        loading: false,
        error: null,
      },
    })
  ),

  on(
    MakeDetailActions.loadModelsByYearFailure,
    (state, { error }): MakeDetailState => ({
      ...state,
      models: {
        ...state.models,
        loading: false,
        error,
      },
    })
  ),

  // Load Models by Vehicle Type
  on(
    MakeDetailActions.loadModelsByVehicleType,
    (state, { vehicleTypeId }): MakeDetailState => ({
      ...state,
      models: {
        ...state.models,
        loading: true,
        error: null,
        selectedYear: null,
        selectedVehicleTypeId: vehicleTypeId,
      },
    })
  ),

  on(
    MakeDetailActions.loadModelsByVehicleTypeSuccess,
    (state, { models }): MakeDetailState => ({
      ...state,
      models: {
        ...modelsAdapter.setAll(models, state.models),
        loading: false,
        error: null,
      },
    })
  ),

  on(
    MakeDetailActions.loadModelsByVehicleTypeFailure,
    (state, { error }): MakeDetailState => ({
      ...state,
      models: {
        ...state.models,
        loading: false,
        error,
      },
    })
  ),

  // Clear
  on(MakeDetailActions.clearMakeDetail, (): MakeDetailState => initialState)
);
