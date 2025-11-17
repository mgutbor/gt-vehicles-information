import { Injectable, inject } from '@angular/core';
import {
  GET_MAKE_BY_ID_USE_CASE,
  GET_MODELS_FOR_YEAR_USE_CASE,
  GET_MODELS_USE_CASE,
  GET_VEHICLE_TYPES_USE_CASE,
} from '@app/core/domain/ports/inbound';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { MakeDetailActions } from './make-detail.actions';

/**
 * Effects para Make Detail
 */
@Injectable()
export class MakeDetailEffects {
  private readonly actions$ = inject(Actions);
  private readonly getMakeByIdUseCase = inject(GET_MAKE_BY_ID_USE_CASE);
  private readonly getVehicleTypesUseCase = inject(GET_VEHICLE_TYPES_USE_CASE);
  private readonly getModelsUseCase = inject(GET_MODELS_USE_CASE);
  private readonly getModelsForYearUseCase = inject(
    GET_MODELS_FOR_YEAR_USE_CASE
  );

  /**
   * Effect para cargar detalles de la marca
   * También dispara la carga de tipos de vehículos y modelos
   */
  loadMakeDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakeDetailActions.loadMakeDetail),
      switchMap(({ makeId }) =>
        this.getMakeByIdUseCase.execute(makeId).pipe(
          mergeMap((make) => {
            if (!make) {
              return [
                MakeDetailActions.loadMakeDetailFailure({
                  error: 'Make not found',
                }),
              ];
            }

            // Cargar make, tipos y modelos en paralelo
            return [
              MakeDetailActions.loadMakeDetailSuccess({ make }),
              MakeDetailActions.loadVehicleTypes({ makeId }),
              MakeDetailActions.loadModels({ makeId }),
            ];
          }),
          catchError((error) =>
            of(
              MakeDetailActions.loadMakeDetailFailure({
                error: error.message || 'Failed to load make detail',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect para cargar tipos de vehículos
   */
  loadVehicleTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakeDetailActions.loadVehicleTypes),
      switchMap(({ makeId }) =>
        this.getVehicleTypesUseCase.execute(makeId).pipe(
          map((vehicleTypes) =>
            MakeDetailActions.loadVehicleTypesSuccess({ vehicleTypes })
          ),
          catchError((error) =>
            of(
              MakeDetailActions.loadVehicleTypesFailure({
                error: error.message || 'Failed to load vehicle types',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect para cargar modelos
   */
  loadModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakeDetailActions.loadModels),
      switchMap(({ makeId }) =>
        this.getModelsUseCase.execute(makeId).pipe(
          map((models) => MakeDetailActions.loadModelsSuccess({ models })),
          catchError((error) =>
            of(
              MakeDetailActions.loadModelsFailure({
                error: error.message || 'Failed to load models',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect para cargar modelos por año
   */
  loadModelsByYear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakeDetailActions.loadModelsByYear),
      switchMap(({ makeId, year }) =>
        this.getModelsForYearUseCase.execute(makeId, year).pipe(
          map((models) =>
            MakeDetailActions.loadModelsByYearSuccess({ models })
          ),
          catchError((error) =>
            of(
              MakeDetailActions.loadModelsByYearFailure({
                error: error.message || 'Failed to load models by year',
              })
            )
          )
        )
      )
    )
  );
}
