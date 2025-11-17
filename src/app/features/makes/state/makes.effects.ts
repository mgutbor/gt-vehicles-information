import { Injectable, inject } from '@angular/core';
import {
  GET_MAKES_USE_CASE,
  SEARCH_MAKES_USE_CASE,
} from '@app/core/domain/ports/inbound';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { MakesActions } from './makes.actions';

/**
 * Effects para el feature de Makes
 * Maneja side effects (llamadas asíncronas)
 */
@Injectable()
export class MakesEffects {
  private readonly actions$ = inject(Actions);
  private readonly getMakesUseCase = inject(GET_MAKES_USE_CASE);
  private readonly searchMakesUseCase = inject(SEARCH_MAKES_USE_CASE);

  /**
   * Effect para cargar todas las marcas
   */
  loadMakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakesActions.loadMakes),
      switchMap(() =>
        this.getMakesUseCase.execute().pipe(
          map((makes) => MakesActions.loadMakesSuccess({ makes })),
          catchError((error) =>
            of(
              MakesActions.loadMakesFailure({
                error: error.message || 'Failed to load makes',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect para buscar marcas
   * Incluye debounce para evitar búsquedas excesivas
   */
  searchMakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakesActions.searchMakes),
      // QUITAR debounceTime de aquí - ya se hace en el componente
      distinctUntilChanged((prev, curr) => prev.query === curr.query),
      switchMap(({ query }) => {
        // Si no hay query, cargar todas las marcas
        if (!query.trim()) {
          return this.getMakesUseCase.execute().pipe(
            map((makes) => MakesActions.searchMakesSuccess({ makes })),
            catchError((error) =>
              of(
                MakesActions.searchMakesFailure({
                  error: error.message || 'Failed to search makes',
                })
              )
            )
          );
        }

        // Buscar con el query
        return this.searchMakesUseCase.execute(query).pipe(
          map((makes) => MakesActions.searchMakesSuccess({ makes })),
          catchError((error) =>
            of(
              MakesActions.searchMakesFailure({
                error: error.message || 'Failed to search makes',
              })
            )
          )
        );
      })
    )
  );

  /**
   * Effect para limpiar búsqueda
   * Recarga todas las marcas
   */
  clearSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakesActions.clearSearch),
      map(() => MakesActions.loadMakes())
    )
  );
}
