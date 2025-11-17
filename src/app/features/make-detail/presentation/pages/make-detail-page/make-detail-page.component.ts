import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoadingState } from '@app/core/domain/models';
import { Subject, takeUntil } from 'rxjs';
import { VehicleModelsComponent } from '../../components/vehicle-models/vehicle-models.component';
import { VehicleTypesComponent } from '../../components/vehicle-types/vehicle-types.component';
import { MakeDetailViewModel } from '../../view-models/make-detail.view-model';

/**
 * Página de detalle de marca
 * Componente contenedor (smart component)
 */
@Component({
  selector: 'app-make-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    VehicleTypesComponent,
    VehicleModelsComponent,
  ],
  providers: [MakeDetailViewModel],
  templateUrl: './make-detail-page.component.html',
  styleUrls: ['./make-detail-page.component.scss'],
})
export class MakeDetailPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly viewModel = inject(MakeDetailViewModel);
  private readonly destroy$ = new Subject<void>();

  readonly viewModel$ = this.viewModel.viewModel$;
  readonly LoadingState = LoadingState;

  private currentMakeId: number | null = null;

  ngOnInit(): void {
    // Suscribirse a los cambios de ruta
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const makeId = Number(params['id']);
      if (makeId && !isNaN(makeId)) {
        this.currentMakeId = makeId;
        this.viewModel.loadMakeDetail(makeId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.viewModel.clearMakeDetail();
  }

  goBack(): void {
    this.router.navigate(['/makes']);
  }

  retry(): void {
    if (this.currentMakeId) {
      this.viewModel.loadMakeDetail(this.currentMakeId);
    }
  }

  onYearSelected(year: number | null): void {
    if (this.currentMakeId) {
      if (year === null) {
        this.viewModel.loadModels(this.currentMakeId);
      } else {
        this.viewModel.loadModelsByYear(this.currentMakeId, year);
      }
    }
  }
}
