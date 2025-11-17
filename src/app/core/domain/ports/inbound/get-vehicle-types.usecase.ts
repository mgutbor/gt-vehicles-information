import { Observable } from 'rxjs';
import { MakeVehicleType } from '../../models';

/**
 * Caso de Uso: Obtener tipos de vehículos para una marca
 */
export abstract class GetVehicleTypesUseCase {
  /**
   * Ejecuta el caso de uso
   * @param makeId ID de la marca
   * @returns Observable con los tipos de vehículos de la marca
   */
  abstract execute(makeId: number): Observable<MakeVehicleType[]>;
}
