import { LoadingState, VehicleMake } from '@app/core/domain/models';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { MakesActions } from './makes.actions';

/**
 * State interface usando Entity Adapter para optimización
 */
export interface MakesState extends EntityState<VehicleMake> {
  loading: boolean;
  loadingState: LoadingState;
  error: string | null;
  searchQuery: string;
  filteredMakeIds: number[];
  selectedMakeId: number | null;
}

/**
 * Entity Adapter para gestión eficiente de colecciones
 * Proporciona métodos CRUD optimizados
 */
export const makesAdapter: EntityAdapter<VehicleMake> = createEntityAdapter<VehicleMake>({
  selectId: (make) => make.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name), // Ordenar alfabéticamente
});

/**
 * Estado inicial
 */
export const initialState: MakesState = makesAdapter.getInitialState({
  loading: false,
  loadingState: LoadingState.IDLE,
  error: null,
  searchQuery: '',
  filteredMakeIds: [],
  selectedMakeId: null,
});

/**
 * Reducer para el feature de Makes
 * Siguiendo el principio de inmutabilidad
 */
export const makesReducer = createReducer(
  initialState,

  // Load Makes
  on(
    MakesActions.loadMakes,
    (state): MakesState => ({
      ...state,
      loading: true,
      loadingState: LoadingState.LOADING,
      error: null,
    })
  ),

  on(MakesActions.loadMakesSuccess, (state, { makes }): MakesState => {
    const newState = makesAdapter.setAll(makes, state);
    return {
      ...newState,
      loading: false,
      loadingState: LoadingState.SUCCESS,
      error: null,
      // Si no hay búsqueda activa, mostrar todas las marcas
      filteredMakeIds: state.searchQuery ? state.filteredMakeIds : makes.map((m) => m.id),
    };
  }),

  on(
    MakesActions.loadMakesFailure,
    (state, { error }): MakesState => ({
      ...state,
      loading: false,
      loadingState: LoadingState.ERROR,
      error,
    })
  ),

  // Search Makes
  on(
    MakesActions.searchMakes,
    (state, { query }): MakesState => ({
      ...state,
      searchQuery: query,
      loading: true,
      loadingState: LoadingState.LOADING,
    })
  ),

  on(
    MakesActions.searchMakesSuccess,
    (state, { makes }): MakesState => ({
      ...state,
      loading: false,
      loadingState: LoadingState.SUCCESS,
      filteredMakeIds: makes.map((m) => m.id),
    })
  ),

  on(
    MakesActions.searchMakesFailure,
    (state, { error }): MakesState => ({
      ...state,
      loading: false,
      loadingState: LoadingState.ERROR,
      error,
    })
  ),

  // Clear Search
  on(
    MakesActions.clearSearch,
    (state): MakesState => ({
      ...state,
      searchQuery: '',
      filteredMakeIds: Object.keys(state.entities).map((id) => Number(id)),
      loading: true, // Activar loading temporalmente para feedback visual
      loadingState: LoadingState.LOADING,
    })
  ),

  // Select/Deselect Make
  on(
    MakesActions.selectMake,
    (state, { makeId }): MakesState => ({
      ...state,
      selectedMakeId: makeId,
    })
  ),

  on(
    MakesActions.deselectMake,
    (state): MakesState => ({
      ...state,
      selectedMakeId: null,
    })
  )
);
