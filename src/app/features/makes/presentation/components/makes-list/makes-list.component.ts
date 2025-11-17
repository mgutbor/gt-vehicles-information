import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, input, output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { VehicleMake } from '@app/core/domain/models';

/**
 * Componente de lista de marcas con Virtual Scroll
 * Componente presentacional
 */
@Component({
  selector: 'app-makes-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './makes-list.component.html',
  styleUrl: './makes-list.component.scss',
})
export class MakesListComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;

  // Inputs
  makes = input.required<VehicleMake[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);
  searchQuery = input<string>('');

  // Outputs
  makeSelected = output<VehicleMake>();
  retry = output<void>();

  /**
   * Scroll to top cuando cambia la lista
   */
  scrollToTop(): void {
    this.viewport?.scrollToIndex(0);
  }
}
