/**
 * Entidad de dominio que representa una marca de vehículos
 * Siguiendo el principio de Single Responsibility (SOLID)
 */
export interface VehicleMake {
  readonly id: number;
  readonly name: string;
}

/**
 * Value Object para información extendida de la marca
 */
export interface VehicleMakeDetails extends VehicleMake {
  readonly country?: string;
  readonly commonModels?: number;
}
