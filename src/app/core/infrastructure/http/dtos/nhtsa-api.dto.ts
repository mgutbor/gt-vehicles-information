/**
 * DTOs (Data Transfer Objects) para las respuestas de la API NHTSA
 * Estos representan la estructura EXACTA que devuelve la API
 * Separados del dominio siguiendo el principio de Segregación de Interfaces (SOLID)
 */

/**
 * Estructura base de todas las respuestas de la API NHTSA
 */
export interface NhtsaApiResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
}

/**
 * DTO para una marca de vehículo desde la API
 * GET /vehicles/GetAllMakes
 */
export interface NhtsaMakeDto {
  Make_ID: number;
  Make_Name: string;
}

/**
 * DTO para tipos de vehículos por marca
 * GET /vehicles/GetVehicleTypesForMakeId/{makeId}
 */
export interface NhtsaVehicleTypeDto {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

/**
 * DTO para modelos de vehículos por marca
 * GET /vehicles/GetModelsForMakeId/{makeId}
 */
export interface NhtsaModelDto {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

/**
 * Tipos de respuesta completos de la API
 */
export type NhtsaMakesResponse = NhtsaApiResponse<NhtsaMakeDto>;
export type NhtsaVehicleTypesResponse = NhtsaApiResponse<NhtsaVehicleTypeDto>;
export type NhtsaModelsResponse = NhtsaApiResponse<NhtsaModelDto>;
