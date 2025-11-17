import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MakeVehicleType } from '../../domain/models';
import { GetVehicleTypesUseCase } from '../../domain/ports/inbound';
import { VEHICLE_REPOSITORY } from '../../domain/ports/outbound';

@Injectable({
  providedIn: 'root',
})
export class GetVehicleTypesUseCaseImpl implements GetVehicleTypesUseCase {
  private readonly repository = inject(VEHICLE_REPOSITORY);

  execute(makeId: number): Observable<MakeVehicleType[]> {
    return this.repository.getVehicleTypesForMake(makeId);
  }
}
