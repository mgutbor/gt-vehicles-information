/**
 * Entidad de dominio que representa un modelo específico de vehículo
 */
export interface VehicleModel {
  readonly id: number;
  readonly makeId: number;
  readonly makeName: string;
  readonly modelName: string;
}

/**
 * Value Object para detalles extendidos del modelo
 */
export interface VehicleModelDetails extends VehicleModel {
  readonly year?: number;
  readonly vehicleTypeId?: number;
  readonly vehicleTypeName?: string;
}
