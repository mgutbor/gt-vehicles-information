import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MakeVehicleType } from '@app/core/domain/models';

/**
 * Componente para mostrar tipos de vehículos
 * Componente presentacional
 */
@Component({
  selector: 'app-vehicle-types',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './vehicle-types.component.html',
  styleUrl: './vehicle-types.component.scss',
})
export class VehicleTypesComponent {
  vehicleTypes = input.required<MakeVehicleType[]>();
  loading = input<boolean>(false);
}
