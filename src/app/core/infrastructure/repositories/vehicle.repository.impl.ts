import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { MakeVehicleType, VehicleMake, VehicleModel } from '../../domain/models';
import { VehicleRepository } from '../../domain/ports/outbound';
import { NhtsaVehicleAdapter } from '../adapters/nhtsa-vehicle.adapter';
import { NhtsaApiService } from '../http/nhtsa-api.service';
import { InMemoryCacheRepository } from './in-memory-cache.repository';

/**
 * Implementación concreta del repositorio de vehículos
 * Utiliza la API NHTSA y caché para optimizar las llamadas
 * Siguiendo el principio de Inversión de Dependencias (SOLID)
 */
@Injectable({
  providedIn: 'root',
})
export class VehicleRepositoryImpl implements VehicleRepository {
  private readonly apiService = inject(NhtsaApiService);
  private readonly cache = inject(InMemoryCacheRepository);

  // Claves de caché
  private readonly CACHE_KEYS = {
    ALL_MAKES: 'vehicle:makes:all',
    MAKE_BY_ID: (id: number) => `vehicle:make:${id}`,
    VEHICLE_TYPES: (makeId: number) => `vehicle:types:${makeId}`,
    MODELS: (makeId: number) => `vehicle:models:${makeId}`,
    MODELS_YEAR: (makeId: number, year: number) => `vehicle:models:${makeId}:${year}`,
  };

  getAllMakes(): Observable<VehicleMake[]> {
    // Intentar obtener de caché primero
    return this.cache.get<VehicleMake[]>(this.CACHE_KEYS.ALL_MAKES).pipe(
      switchMap((cached) => {
        if (cached) {
          return [cached];
        }

        // Si no está en caché, obtener de la API
        return this.apiService.getAllMakes().pipe(
          map((response) => NhtsaVehicleAdapter.toVehicleMakes(response.Results)),
          tap((makes) => {
            // Guardar en caché por 10 minutos
            this.cache.set(this.CACHE_KEYS.ALL_MAKES, makes, 10 * 60 * 1000);
          }),
          shareReplay(1) // Compartir resultado entre múltiples suscriptores
        );
      })
    );
  }

  getMakeById(makeId: number): Observable<VehicleMake | null> {
    const cacheKey = this.CACHE_KEYS.MAKE_BY_ID(makeId);

    return this.cache.get<VehicleMake>(cacheKey).pipe(
      switchMap((cached) => {
        if (cached) {
          return [cached];
        }

        // Si no está en caché, buscar en la lista completa
        return this.getAllMakes().pipe(
          map((makes) => {
            const make = makes.find((m) => m.id === makeId) || null;
            if (make) {
              this.cache.set(cacheKey, make, 10 * 60 * 1000);
            }
            return make;
          })
        );
      })
    );
  }

  searchMakesByName(query: string): Observable<VehicleMake[]> {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      return this.getAllMakes();
    }

    return this.getAllMakes().pipe(
      map((makes) => makes.filter((make) => make.name.toLowerCase().includes(normalizedQuery)))
    );
  }

  getVehicleTypesForMake(makeId: number): Observable<MakeVehicleType[]> {
    const cacheKey = this.CACHE_KEYS.VEHICLE_TYPES(makeId);

    return this.cache.get<MakeVehicleType[]>(cacheKey).pipe(
      switchMap((cached) => {
        if (cached) {
          return [cached];
        }

        return this.getMakeById(makeId).pipe(
          switchMap((make) => {
            if (!make) {
              return [[]];
            }

            return this.apiService.getVehicleTypesForMake(makeId).pipe(
              map((response) =>
                NhtsaVehicleAdapter.toMakeVehicleTypes(response.Results, makeId, make.name)
              ),
              tap((types) => {
                this.cache.set(cacheKey, types, 15 * 60 * 1000); // 15 minutos
              }),
              shareReplay(1)
            );
          })
        );
      })
    );
  }

  getModelsForMake(makeId: number): Observable<VehicleModel[]> {
    const cacheKey = this.CACHE_KEYS.MODELS(makeId);

    return this.cache.get<VehicleModel[]>(cacheKey).pipe(
      switchMap((cached) => {
        if (cached) {
          return [cached];
        }

        return this.apiService.getModelsForMake(makeId).pipe(
          map((response) => NhtsaVehicleAdapter.toVehicleModels(response.Results)),
          tap((models) => {
            this.cache.set(cacheKey, models, 15 * 60 * 1000); // 15 minutos
          }),
          shareReplay(1)
        );
      })
    );
  }

  getModelsForMakeYear(makeId: number, year: number): Observable<VehicleModel[]> {
    const cacheKey = this.CACHE_KEYS.MODELS_YEAR(makeId, year);

    return this.cache.get<VehicleModel[]>(cacheKey).pipe(
      switchMap((cached) => {
        if (cached) {
          return [cached];
        }

        return this.apiService.getModelsForMakeYear(makeId, year).pipe(
          map((response) => NhtsaVehicleAdapter.toVehicleModels(response.Results)),
          tap((models) => {
            this.cache.set(cacheKey, models, 20 * 60 * 1000); // 20 minutos
          }),
          shareReplay(1)
        );
      })
    );
  }
}
