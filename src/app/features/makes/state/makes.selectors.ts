import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MakesState, makesAdapter } from './makes.reducer';

/**
 * Feature selector
 */
export const selectMakesState = createFeatureSelector<MakesState>('makes');

/**
 * Entity selectors generados por el adapter
 */
const { selectIds, selectEntities, selectAll, selectTotal } =
  makesAdapter.getSelectors(selectMakesState);

/**
 * Selectors básicos
 */
export const selectAllMakes = selectAll;
export const selectMakesEntities = selectEntities;
export const selectMakesIds = selectIds;
export const selectTotalMakes = selectTotal;

export const selectMakesLoading = createSelector(selectMakesState, (state) => state.loading);

export const selectMakesLoadingState = createSelector(
  selectMakesState,
  (state) => state.loadingState
);

export const selectMakesError = createSelector(selectMakesState, (state) => state.error);

export const selectSearchQuery = createSelector(selectMakesState, (state) => state.searchQuery);

/**
 * Selector memoizado para marcas filtradas
 * Optimizado para evitar recálculos innecesarios
 */
export const selectFilteredMakes = createSelector(
  selectAllMakes,
  selectMakesState,
  (makes, state) => {
    if (!state.searchQuery) {
      return makes;
    }
    return makes.filter((make) => state.filteredMakeIds.includes(make.id));
  }
);

/**
 * Selector para la marca seleccionada
 */
export const selectSelectedMakeId = createSelector(
  selectMakesState,
  (state) => state.selectedMakeId
);

export const selectSelectedMake = createSelector(
  selectMakesEntities,
  selectSelectedMakeId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

/**
 * Selector combinado para VM (ViewModel)
 * Agrupa toda la información necesaria para la UI
 */
export const selectMakesViewModel = createSelector(
  selectFilteredMakes,
  selectMakesLoading,
  selectMakesError,
  selectSearchQuery,
  selectTotalMakes,
  (makes, loading, error, searchQuery, total) => ({
    makes,
    loading,
    error,
    searchQuery,
    total,
    isEmpty: makes.length === 0,
    hasResults: makes.length > 0,
  })
);
