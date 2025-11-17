import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MakeDetailActions } from '../../state/make-detail.actions';
import {
  selectAllModels,
  selectAllVehicleTypes,
  selectCurrentMake,
  selectMakeDetailLoadingState,
  selectMakeDetailViewModel,
  selectModelsLoading,
  selectSelectedYear,
  selectVehicleTypesLoading,
} from '../../state/make-detail.selectors';

/**
 * ViewModel para el feature de Make Detail
 */
@Injectable()
export class MakeDetailViewModel {
  private readonly store = inject(Store);

  // Observables para el componente
  readonly viewModel$ = this.store.select(selectMakeDetailViewModel);
  readonly currentMake$ = this.store.select(selectCurrentMake);
  readonly vehicleTypes$ = this.store.select(selectAllVehicleTypes);
  readonly models$ = this.store.select(selectAllModels);
  readonly loadingState$ = this.store.select(selectMakeDetailLoadingState);
  readonly vehicleTypesLoading$ = this.store.select(selectVehicleTypesLoading);
  readonly modelsLoading$ = this.store.select(selectModelsLoading);
  readonly selectedYear$ = this.store.select(selectSelectedYear);

  /**
   * Comandos
   */

  loadMakeDetail(makeId: number): void {
    this.store.dispatch(MakeDetailActions.loadMakeDetail({ makeId }));
  }

  loadVehicleTypes(makeId: number): void {
    this.store.dispatch(MakeDetailActions.loadVehicleTypes({ makeId }));
  }

  loadModels(makeId: number): void {
    this.store.dispatch(MakeDetailActions.loadModels({ makeId }));
  }

  loadModelsByYear(makeId: number, year: number): void {
    this.store.dispatch(MakeDetailActions.loadModelsByYear({ makeId, year }));
  }

  clearMakeDetail(): void {
    this.store.dispatch(MakeDetailActions.clearMakeDetail());
  }
}
