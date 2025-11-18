import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MakeVehicleType, VehicleModel } from '@app/core/domain/models';
import { VehicleModelsComponent } from './vehicle-models.component';

describe('VehicleModelsComponent', () => {
  let component: VehicleModelsComponent;
  let fixture: ComponentFixture<VehicleModelsComponent>;

  const mockModels: VehicleModel[] = [
    {
      id: 1825,
      makeId: 440,
      makeName: 'AUDI',
      modelName: 'A4',
    },
    {
      id: 1826,
      makeId: 440,
      makeName: 'AUDI',
      modelName: 'A6',
    },
  ];

  const mockVehicleTypes: MakeVehicleType[] = [
    {
      makeId: 440,
      makeName: 'AUDI',
      vehicleType: {
        id: 2,
        name: 'Passenger Car',
      },
    },
    {
      makeId: 440,
      makeName: 'AUDI',
      vehicleType: {
        id: 3,
        name: 'Truck',
      },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleModelsComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleModelsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('models', []);
    fixture.componentRef.setInput('vehicleTypes', mockVehicleTypes);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when loading is true', () => {
    fixture.componentRef.setInput('models', []);
    fixture.componentRef.setInput('vehicleTypes', mockVehicleTypes);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should display empty state when no models are available', () => {
    fixture.componentRef.setInput('models', []);
    fixture.componentRef.setInput('vehicleTypes', mockVehicleTypes);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const emptyContainer = fixture.nativeElement.querySelector('.empty-container');
    expect(emptyContainer).toBeTruthy();
    expect(emptyContainer.textContent).toContain('No models available');
  });

  it('should display models list when models are available', () => {
    fixture.componentRef.setInput('models', mockModels);
    fixture.componentRef.setInput('vehicleTypes', mockVehicleTypes);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const modelsInfo = fixture.nativeElement.querySelector('.models-info');
    expect(modelsInfo.textContent).toContain('2 models found');
  });

  it('should emit yearSelected when year is changed', () => {
    let selectedYear: number | null | undefined;
    component.yearSelected.subscribe((year: number | null) => {
      selectedYear = year;
    });

    component.onYearChange(2023);

    expect(selectedYear).toBe(2023);
  });

  it('should have year filter dropdown', () => {
    fixture.componentRef.setInput('models', []);
    fixture.componentRef.setInput('vehicleTypes', mockVehicleTypes);
    fixture.detectChanges();

    const filtersContainer = fixture.nativeElement.querySelector('.filters-container');
    expect(filtersContainer).toBeTruthy();
  });

  it('should disable year filter when loading', () => {
    fixture.componentRef.setInput('models', []);
    fixture.componentRef.setInput('vehicleTypes', mockVehicleTypes);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('mat-select');
    expect(select.getAttribute('ng-reflect-disabled')).toBe('true');
  });

  it('should generate 30 years for the dropdown', () => {
    expect(component.availableYears.length).toBe(30);
    expect(component.availableYears[0]).toBe(new Date().getFullYear());
  });
});
