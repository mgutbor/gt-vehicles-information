import { Observable } from 'rxjs';
import { VehicleMake } from '../../models';

/**
 * Caso de Uso: Obtener todas las marcas de vehículos
 * Siguiendo el principio de Single Responsibility (SOLID)
 *
 * Los casos de uso representan las operaciones del dominio
 * y son independientes de la infraestructura
 */
export abstract class GetMakesUseCase {
  /**
   * Ejecuta el caso de uso
   * @returns Observable con todas las marcas disponibles
   */
  abstract execute(): Observable<VehicleMake[]>;
}

/**
 * Caso de Uso: Buscar marcas por nombre
 */
export abstract class SearchMakesUseCase {
  /**
   * Ejecuta la búsqueda de marcas
   * @param query Término de búsqueda
   * @returns Observable con marcas que coinciden con la búsqueda
   */
  abstract execute(query: string): Observable<VehicleMake[]>;
}

/**
 * Caso de Uso: Obtener marca por ID
 */
export abstract class GetMakeByIdUseCase {
  /**
   * Obtiene una marca específica
   * @param makeId ID de la marca
   * @returns Observable con la marca o null si no existe
   */
  abstract execute(makeId: number): Observable<VehicleMake | null>;
}
