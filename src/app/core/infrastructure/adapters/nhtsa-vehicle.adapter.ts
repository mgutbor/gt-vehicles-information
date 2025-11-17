import { MakeVehicleType, VehicleMake, VehicleModel, VehicleType } from '../../domain/models';
import { NhtsaMakeDto, NhtsaModelDto, NhtsaVehicleTypeDto } from '../http/dtos/nhtsa-api.dto';

/**
 * Adaptador para transformar DTOs de la API NHTSA a entidades de dominio
 * Siguiendo el principio de Single Responsibility (SOLID)
 *
 * Este adaptador actúa como Anti-Corruption Layer (ACL)
 * protegiendo el dominio de cambios en la API externa
 */
export class NhtsaVehicleAdapter {
  /**
   * Convierte un DTO de marca de la API a entidad de dominio
   */
  static toVehicleMake(dto: NhtsaMakeDto): VehicleMake {
    return {
      id: dto.Make_ID,
      name: dto.Make_Name,
    };
  }

  /**
   * Convierte múltiples DTOs de marcas a entidades de dominio
   */
  static toVehicleMakes(dtos: NhtsaMakeDto[]): VehicleMake[] {
    return dtos.map((dto) => this.toVehicleMake(dto));
  }

  /**
   * Convierte un DTO de tipo de vehículo a entidad de dominio
   */
  static toVehicleType(dto: NhtsaVehicleTypeDto): VehicleType {
    return {
      id: dto.VehicleTypeId,
      name: dto.VehicleTypeName,
    };
  }

  /**
   * Convierte DTO de tipo de vehículo con información de marca
   */
  static toMakeVehicleType(
    dto: NhtsaVehicleTypeDto,
    makeId: number,
    makeName: string
  ): MakeVehicleType {
    return {
      makeId,
      makeName,
      vehicleType: this.toVehicleType(dto),
    };
  }

  /**
   * Convierte múltiples DTOs de tipos de vehículos
   */
  static toMakeVehicleTypes(
    dtos: NhtsaVehicleTypeDto[],
    makeId: number,
    makeName: string
  ): MakeVehicleType[] {
    return dtos.map((dto) => this.toMakeVehicleType(dto, makeId, makeName));
  }

  /**
   * Convierte un DTO de modelo a entidad de dominio
   */
  static toVehicleModel(dto: NhtsaModelDto): VehicleModel {
    return {
      id: dto.Model_ID,
      makeId: dto.Make_ID,
      makeName: dto.Make_Name,
      modelName: dto.Model_Name,
    };
  }

  /**
   * Convierte múltiples DTOs de modelos a entidades de dominio
   */
  static toVehicleModels(dtos: NhtsaModelDto[]): VehicleModel[] {
    return dtos.map((dto) => this.toVehicleModel(dto));
  }
}
