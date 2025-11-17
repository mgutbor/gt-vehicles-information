import { LoadingState, VehicleMake } from '@app/core/domain/models';
import { MakesActions } from './makes.actions';
import { initialState, makesReducer, MakesState } from './makes.reducer';

describe('MakesReducer', () => {
  const mockMakes: VehicleMake[] = [
    { id: 440, name: 'AUDI' },
    { id: 441, name: 'BMW' },
    { id: 442, name: 'TESLA' },
  ];

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = { type: 'Unknown' } as any;
      const result = makesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadMakes', () => {
    it('should set loading to true', () => {
      const action = MakesActions.loadMakes();
      const result = makesReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.loadingState).toBe(LoadingState.LOADING);
      expect(result.error).toBeNull();
    });
  });

  describe('loadMakesSuccess', () => {
    it('should populate makes and set loading to false', () => {
      const action = MakesActions.loadMakesSuccess({ makes: mockMakes });
      const result = makesReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.loadingState).toBe(LoadingState.SUCCESS);
      expect(result.ids.length).toBe(3);
      expect(result.entities[440]?.name).toBe('AUDI');
    });
  });

  describe('loadMakesFailure', () => {
    it('should set error and loading to false', () => {
      const action = MakesActions.loadMakesFailure({ error: 'Test error' });
      const result = makesReducer(initialState, action);

      expect(result.loading).toBe(false);
      expect(result.loadingState).toBe(LoadingState.ERROR);
      expect(result.error).toBe('Test error');
    });
  });

  describe('searchMakes', () => {
    it('should set search query and loading state', () => {
      const action = MakesActions.searchMakes({ query: 'BMW' });
      const result = makesReducer(initialState, action);

      expect(result.searchQuery).toBe('BMW');
      expect(result.loading).toBe(true);
    });
  });

  describe('clearSearch', () => {
    it('should clear search query and show all makes', () => {
      const stateWithSearch: MakesState = {
        ...initialState,
        searchQuery: 'BMW',
        filteredMakeIds: [441],
      };

      const action = MakesActions.clearSearch();
      const result = makesReducer(stateWithSearch, action);

      expect(result.searchQuery).toBe('');
    });
  });
});
