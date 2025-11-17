import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VehicleMake } from '@app/core/domain/models';
import { MakesListComponent } from '../../components/makes-list/makes-list.component';
import { MakesSearchComponent } from '../../components/makes-search/makes-search.component';
import { MakesViewModel } from '../../view-models/makes.view-model';

/**
 * Página principal de Makes
 * Componente contenedor (smart component)
 */
@Component({
  selector: 'app-makes-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MakesSearchComponent,
    MakesListComponent,
  ],
  providers: [MakesViewModel],
  templateUrl: './makes-page.component.html',
  styleUrls: ['./makes-page.component.scss'],
})
export class MakesPageComponent implements OnInit {
  @ViewChild(MakesListComponent) listComponent?: MakesListComponent;

  private readonly viewModel = inject(MakesViewModel);

  // Exponer observables del ViewModel
  readonly viewModel$ = this.viewModel.viewModel$;

  ngOnInit(): void {
    // Cargar marcas al inicializar
    this.viewModel.loadMakes();
  }

  onSearch(query: string): void {
    this.viewModel.searchMakes(query);
    // Scroll to top cuando se busca
    setTimeout(() => this.listComponent?.scrollToTop(), 100);
  }

  onClearSearch(): void {
    this.viewModel.clearSearch();
    setTimeout(() => this.listComponent?.scrollToTop(), 100);
  }

  onMakeSelected(make: VehicleMake): void {
    this.viewModel.selectMake(make.id);
  }

  onRetry(): void {
    this.viewModel.loadMakes();
  }
}
