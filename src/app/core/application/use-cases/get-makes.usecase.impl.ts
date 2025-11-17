import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleMake } from '../../domain/models';
import {
  GetMakeByIdUseCase,
  GetMakesUseCase,
  SearchMakesUseCase,
} from '../../domain/ports/inbound';
import { VEHICLE_REPOSITORY } from '../../domain/ports/outbound';

/**
 * Implementación del caso de uso GetMakes
 * Delega en el repositorio la obtención de datos
 */
@Injectable({
  providedIn: 'root',
})
export class GetMakesUseCaseImpl implements GetMakesUseCase {
  private readonly repository = inject(VEHICLE_REPOSITORY);

  execute(): Observable<VehicleMake[]> {
    return this.repository.getAllMakes();
  }
}

@Injectable({
  providedIn: 'root',
})
export class SearchMakesUseCaseImpl implements SearchMakesUseCase {
  private readonly repository = inject(VEHICLE_REPOSITORY);

  execute(query: string): Observable<VehicleMake[]> {
    return this.repository.searchMakesByName(query);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetMakeByIdUseCaseImpl implements GetMakeByIdUseCase {
  private readonly repository = inject(VEHICLE_REPOSITORY);

  execute(makeId: number): Observable<VehicleMake | null> {
    return this.repository.getMakeById(makeId);
  }
}
