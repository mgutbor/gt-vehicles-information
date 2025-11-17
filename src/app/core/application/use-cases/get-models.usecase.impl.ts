import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from '../../domain/models';
import {
  GetModelsForYearUseCase,
  GetModelsUseCase,
} from '../../domain/ports/inbound';
import { VEHICLE_REPOSITORY } from '../../domain/ports/outbound';

@Injectable({
  providedIn: 'root',
})
export class GetModelsUseCaseImpl implements GetModelsUseCase {
  private readonly repository = inject(VEHICLE_REPOSITORY);

  execute(makeId: number): Observable<VehicleModel[]> {
    return this.repository.getModelsForMake(makeId);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetModelsForYearUseCaseImpl implements GetModelsForYearUseCase {
  private readonly repository = inject(VEHICLE_REPOSITORY);

  execute(makeId: number, year: number): Observable<VehicleModel[]> {
    return this.repository.getModelsForMakeYear(makeId, year);
  }
}
