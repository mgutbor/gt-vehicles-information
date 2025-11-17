import { NhtsaMakeDto, NhtsaModelDto, NhtsaVehicleTypeDto } from '../http/dtos/nhtsa-api.dto';
import { NhtsaVehicleAdapter } from './nhtsa-vehicle.adapter';

describe('NhtsaVehicleAdapter', () => {
  describe('toVehicleMake', () => {
    it('should convert DTO to VehicleMake entity', () => {
      const dto: NhtsaMakeDto = {
        Make_ID: 440,
        Make_Name: 'AUDI',
      };

      const result = NhtsaVehicleAdapter.toVehicleMake(dto);

      expect(result).toEqual({
        id: 440,
        name: 'AUDI',
      });
    });
  });

  describe('toVehicleMakes', () => {
    it('should convert multiple DTOs to VehicleMake entities', () => {
      const dtos: NhtsaMakeDto[] = [
        { Make_ID: 440, Make_Name: 'AUDI' },
        { Make_ID: 441, Make_Name: 'BMW' },
      ];

      const result = NhtsaVehicleAdapter.toVehicleMakes(dtos);

      expect(result.length).toBe(2);
      expect(result[0].id).toBe(440);
      expect(result[1].name).toBe('BMW');
    });
  });

  describe('toMakeVehicleType', () => {
    it('should convert DTO to MakeVehicleType entity', () => {
      const dto: NhtsaVehicleTypeDto = {
        VehicleTypeId: 2,
        VehicleTypeName: 'Passenger Car',
      };

      const result = NhtsaVehicleAdapter.toMakeVehicleType(dto, 440, 'AUDI');

      expect(result).toEqual({
        makeId: 440,
        makeName: 'AUDI',
        vehicleType: {
          id: 2,
          name: 'Passenger Car',
        },
      });
    });
  });

  describe('toVehicleModel', () => {
    it('should convert DTO to VehicleModel entity', () => {
      const dto: NhtsaModelDto = {
        Make_ID: 440,
        Make_Name: 'AUDI',
        Model_ID: 1825,
        Model_Name: 'A4',
      };

      const result = NhtsaVehicleAdapter.toVehicleModel(dto);

      expect(result).toEqual({
        id: 1825,
        makeId: 440,
        makeName: 'AUDI',
        modelName: 'A4',
      });
    });
  });
});
