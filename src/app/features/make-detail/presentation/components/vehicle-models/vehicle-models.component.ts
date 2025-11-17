import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { VehicleModel } from '@app/core/domain/models';

/**
 * Componente para mostrar modelos de vehículos
 * Componente presentacional
 */
@Component({
  selector: 'app-vehicle-models',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ScrollingModule,
  ],
  templateUrl: './vehicle-models.component.html',
  styleUrl: './vehicle-models.component.scss',
})
export class VehicleModelsComponent {
  models = input.required<VehicleModel[]>();
  loading = input<boolean>(false);
  selectedYear = input<number | null>(null);

  yearSelected = output<number | null>();

  // Generar años disponibles (últimos 30 años)
  readonly availableYears = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  onYearChange(year: number | null): void {
    this.yearSelected.emit(year);
  }
}
