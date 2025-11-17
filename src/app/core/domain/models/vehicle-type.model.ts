/**
 * Entidad de dominio que representa un tipo de vehículo
 * (ej: Sedan, SUV, Truck, Motorcycle, etc.)
 */
export interface VehicleType {
  readonly id: number;
  readonly name: string;
}

/**
 * Relación entre marca y tipo de vehículo
 */
export interface MakeVehicleType {
  readonly makeId: number;
  readonly makeName: string;
  readonly vehicleType: VehicleType;
}
