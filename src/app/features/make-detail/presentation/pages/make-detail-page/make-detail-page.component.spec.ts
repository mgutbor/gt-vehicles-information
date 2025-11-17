import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { LoadingState } from '@app/core/domain/models';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MakeDetailPageComponent } from './make-detail-page.component';

describe('MakeDetailPageComponent', () => {
  let component: MakeDetailPageComponent;
  let fixture: ComponentFixture<MakeDetailPageComponent>;

  beforeEach(async () => {
    const storeMock = {
      select: jasmine.createSpy('select').and.returnValue(
        of({
          make: null,
          loadingState: LoadingState.IDLE,
          vehicleTypes: [],
          typesLoading: false,
          models: [],
          modelsLoading: false,
          selectedYear: null,
          error: null,
          hasVehicleTypes: false,
          hasModels: false,
          isLoading: false,
        })
      ),
      dispatch: jasmine.createSpy('dispatch'),
    };

    await TestBed.configureTestingModule({
      imports: [MakeDetailPageComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: Store, useValue: storeMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '440' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MakeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have viewModel$ observable', () => {
    expect(component.viewModel$).toBeDefined();
  });

  it('should have LoadingState enum available', () => {
    expect(component.LoadingState).toBeDefined();
    expect(component.LoadingState.IDLE).toBe(LoadingState.IDLE);
  });

  it('should navigate back when goBack is called', () => {
    spyOn(component['router'], 'navigate');
    component.goBack();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/makes']);
  });

  it('should have retry method', () => {
    expect(component.retry).toBeDefined();
    expect(() => component.retry()).not.toThrow();
  });

  it('should have onYearSelected method', () => {
    expect(component.onYearSelected).toBeDefined();
    expect(() => component.onYearSelected(2023)).not.toThrow();
    expect(() => component.onYearSelected(null)).not.toThrow();
  });

  it('should cleanup on destroy', () => {
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
