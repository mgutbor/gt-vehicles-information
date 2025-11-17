import { Observable } from 'rxjs';
import { MakeVehicleType, VehicleMake, VehicleModel } from '../../models';

/**
 * Port (Interface) del Repositorio de Vehículos
 * Define el contrato que debe cumplir cualquier implementación
 * Siguiendo el principio de Inversión de Dependencias (SOLID)
 *
 * Esta interfaz pertenece al DOMINIO, no a la infraestructura
 * Las implementaciones concretas dependen de esta abstracción
 */
export abstract class VehicleRepository {
  /**
   * Obtiene todas las marcas de vehículos disponibles
   * @returns Observable con array de marcas
   */
  abstract getAllMakes(): Observable<VehicleMake[]>;

  /**
   * Obtiene una marca específica por su ID
   * @param makeId ID de la marca
   * @returns Observable con la marca o null si no existe
   */
  abstract getMakeById(makeId: number): Observable<VehicleMake | null>;

  /**
   * Busca marcas por nombre (filtro)
   * @param query Término de búsqueda
   * @returns Observable con array de marcas filtradas
   */
  abstract searchMakesByName(query: string): Observable<VehicleMake[]>;

  /**
   * Obtiene los tipos de vehículos disponibles para una marca
   * @param makeId ID de la marca
   * @returns Observable con array de tipos de vehículos
   */
  abstract getVehicleTypesForMake(makeId: number): Observable<MakeVehicleType[]>;

  /**
   * Obtiene todos los modelos disponibles para una marca
   * @param makeId ID de la marca
   * @returns Observable con array de modelos
   */
  abstract getModelsForMake(makeId: number): Observable<VehicleModel[]>;

  /**
   * Obtiene modelos de una marca para un año específico
   * @param makeId ID de la marca
   * @param year Año del modelo
   * @returns Observable con array de modelos del año especificado
   */
  abstract getModelsForMakeYear(makeId: number, year: number): Observable<VehicleModel[]>;

  /**
   * Obtiene modelos de una marca para un tipo de vehículo específico
   * @param makeId ID de la marca
   * @param vehicleTypeId ID del tipo de vehículo
   * @returns Observable con array de modelos del tipo de vehículo especificado
   */
  abstract getModelsForMakeVehicleType(makeId: number, vehicleTypeId: number): Observable<VehicleModel[]>;
}
