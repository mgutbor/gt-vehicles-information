import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MakesActions } from '../../state/makes.actions';
import {
  selectFilteredMakes,
  selectMakesError,
  selectMakesLoading,
  selectMakesViewModel,
  selectSearchQuery,
  selectSelectedMake,
} from '../../state/makes.selectors';

/**
 * ViewModel para el feature de Makes
 * Actúa como intermediario entre el Store y los componentes
 * Siguiendo el patrón MVVM
 */
@Injectable()
export class MakesViewModel {
  private readonly store = inject(Store);

  // Observables para el componente
  readonly viewModel$ = this.store.select(selectMakesViewModel);
  readonly makes$ = this.store.select(selectFilteredMakes);
  readonly loading$ = this.store.select(selectMakesLoading);
  readonly error$ = this.store.select(selectMakesError);
  readonly searchQuery$ = this.store.select(selectSearchQuery);
  readonly selectedMake$ = this.store.select(selectSelectedMake);

  /**
   * Comandos (métodos que disparan acciones)
   */

  loadMakes(): void {
    this.store.dispatch(MakesActions.loadMakes());
  }

  searchMakes(query: string): void {
    this.store.dispatch(MakesActions.searchMakes({ query }));
  }

  clearSearch(): void {
    this.store.dispatch(MakesActions.clearSearch());
  }

  selectMake(makeId: number): void {
    this.store.dispatch(MakesActions.selectMake({ makeId }));
  }

  deselectMake(): void {
    this.store.dispatch(MakesActions.deselectMake());
  }
}
