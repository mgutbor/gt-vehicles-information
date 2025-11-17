import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, effect, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * Componente de búsqueda de marcas con debounce
 */
@Component({
  selector: 'app-makes-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './makes-search.component.html',
  styleUrl: './makes-search.component.scss',
})
export class MakesSearchComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  searchControl = new FormControl('');

  // Inputs
  searchQuery = input<string>('');
  disabled = input<boolean>(false);

  // Outputs
  search = output<string>();
  clear = output<void>();

  constructor() {
    // Sincronizar el input signal con el FormControl
    effect(() => {
      const query = this.searchQuery();
      if (query !== this.searchControl.value) {
        this.searchControl.setValue(query, { emitEvent: false });
      }
    });

    // Manejar disabled state
    effect(() => {
      const isDisabled = this.disabled();
      if (isDisabled) {
        this.searchControl.disable({ emitEvent: false });
      } else {
        this.searchControl.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    // AQUÍ está el debounce - se aplica ANTES de emitir el evento
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500), // Esperar 500ms después del último cambio
        distinctUntilChanged(), // Solo emitir si el valor cambió
        takeUntil(this.destroy$) // Limpiar al destruir componente
      )
      .subscribe((value: string | null) => {
        this.search.emit(value || '');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClear(): void {
    this.searchControl.setValue('');
    this.clear.emit();
  }
}
