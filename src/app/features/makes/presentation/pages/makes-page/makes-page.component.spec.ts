import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MakesPageComponent } from './makes-page.component';

describe('MakesPageComponent', () => {
  let component: MakesPageComponent;
  let fixture: ComponentFixture<MakesPageComponent>;

  beforeEach(async () => {
    // Mock simple del Store
    const storeMock = {
      select: jasmine.createSpy('select').and.returnValue(
        of({
          makes: [],
          loading: false,
          error: null,
          searchQuery: '',
          total: 0,
          isEmpty: true,
          hasResults: false,
        })
      ),
      dispatch: jasmine.createSpy('dispatch'),
    };

    await TestBed.configureTestingModule({
      imports: [MakesPageComponent, NoopAnimationsModule],
      providers: [provideRouter([]), { provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MakesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have viewModel$ observable', () => {
    expect(component.viewModel$).toBeDefined();
  });

  // Tests básicos de métodos (sin verificar ViewModels internos)
  it('should have onSearch method', () => {
    expect(component.onSearch).toBeDefined();
    expect(() => component.onSearch('test')).not.toThrow();
  });

  it('should have onClearSearch method', () => {
    expect(component.onClearSearch).toBeDefined();
    expect(() => component.onClearSearch()).not.toThrow();
  });

  it('should have onMakeSelected method', () => {
    expect(component.onMakeSelected).toBeDefined();
    const mockMake = { id: 440, name: 'AUDI' };
    expect(() => component.onMakeSelected(mockMake)).not.toThrow();
  });

  it('should have onRetry method', () => {
    expect(component.onRetry).toBeDefined();
    expect(() => component.onRetry()).not.toThrow();
  });
});
