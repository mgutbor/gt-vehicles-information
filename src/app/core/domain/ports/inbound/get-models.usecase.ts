import { Observable } from 'rxjs';
import { VehicleModel } from '../../models';

/**
 * Caso de Uso: Obtener modelos para una marca
 */
export abstract class GetModelsUseCase {
  /**
   * Ejecuta el caso de uso
   * @param makeId ID de la marca
   * @returns Observable con los modelos de la marca
   */
  abstract execute(makeId: number): Observable<VehicleModel[]>;
}

/**
 * Caso de Uso: Obtener modelos para una marca y año
 */
export abstract class GetModelsForYearUseCase {
  /**
   * Ejecuta el caso de uso
   * @param makeId ID de la marca
   * @param year Año del modelo
   * @returns Observable con los modelos de la marca para el año especificado
   */
  abstract execute(makeId: number, year: number): Observable<VehicleModel[]>;
}

/**
 * Caso de Uso: Obtener modelos para una marca y tipo de vehículo
 */
export abstract class GetModelsForVehicleTypeUseCase {
  /**
   * Ejecuta el caso de uso
   * @param makeId ID de la marca
   * @param vehicleTypeId ID del tipo de vehículo
   * @returns Observable con los modelos de la marca para el tipo de vehículo especificado
   */
  abstract execute(makeId: number, vehicleTypeId: number): Observable<VehicleModel[]>;
}
