import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { ApiUrlBuilder, NHTSA_API_CONFIG } from './api.config';
import {
  NhtsaMakesResponse,
  NhtsaModelsResponse,
  NhtsaVehicleTypesResponse,
} from './dtos/nhtsa-api.dto';

/**
 * Servicio HTTP para interactuar con la API NHTSA
 * Responsable únicamente de las llamadas HTTP (Single Responsibility)
 */
@Injectable({
  providedIn: 'root',
})
export class NhtsaApiService {
  private readonly http = inject(HttpClient);
  private readonly config = NHTSA_API_CONFIG;

  /**
   * Obtiene todas las marcas de vehículos
   */
  getAllMakes(): Observable<NhtsaMakesResponse> {
    const url = ApiUrlBuilder.build({ endpoint: 'getAllMakes' });

    return this.http.get<NhtsaMakesResponse>(url).pipe(
      timeout(this.config.timeout),
      retry(2), // Reintentar 2 veces en caso de error
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene los tipos de vehículos para una marca específica
   */
  getVehicleTypesForMake(makeId: number): Observable<NhtsaVehicleTypesResponse> {
    const url = ApiUrlBuilder.build({
      endpoint: 'getVehicleTypesForMake',
      pathParams: { makeId },
    });

    return this.http
      .get<NhtsaVehicleTypesResponse>(url)
      .pipe(timeout(this.config.timeout), retry(2), catchError(this.handleError));
  }

  /**
   * Obtiene los modelos para una marca específica
   */
  getModelsForMake(makeId: number): Observable<NhtsaModelsResponse> {
    const url = ApiUrlBuilder.build({
      endpoint: 'getModelsForMake',
      pathParams: { makeId },
    });

    return this.http
      .get<NhtsaModelsResponse>(url)
      .pipe(timeout(this.config.timeout), retry(2), catchError(this.handleError));
  }

  /**
   * Obtiene los modelos para una marca y año específicos
   * La API NHTSA requiere formato: /GetModelsForMakeYear/makeId/{makeId}/modelyear/{year}
   */
  getModelsForMakeYear(makeId: number, year: number): Observable<NhtsaModelsResponse> {
    const url = `${this.config.baseUrl}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=${this.config.defaultFormat}`;

    return this.http
      .get<NhtsaModelsResponse>(url)
      .pipe(timeout(this.config.timeout), retry(2), catchError(this.handleError));
  }

  /**
   * Manejo centralizado de errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }

    console.error('NHTSA API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
