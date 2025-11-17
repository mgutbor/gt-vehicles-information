import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MakeVehicleType } from '@app/core/domain/models';
import { VehicleTypesComponent } from './vehicle-types.component';

describe('VehicleTypesComponent', () => {
  let component: VehicleTypesComponent;
  let fixture: ComponentFixture<VehicleTypesComponent>;

  const mockVehicleTypes: MakeVehicleType[] = [
    {
      makeId: 440,
      makeName: 'AUDI',
      vehicleType: { id: 2, name: 'Passenger Car' },
    },
    {
      makeId: 440,
      makeName: 'AUDI',
      vehicleType: { id: 3, name: 'Truck' },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypesComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTypesComponent);
    component = fixture.componentInstance;

    // Proporcionar inputs requeridos
    fixture.componentRef.setInput('vehicleTypes', mockVehicleTypes);
    fixture.componentRef.setInput('loading', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when loading is true', () => {
    fixture.componentRef.setInput('vehicleTypes', []);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should display empty state when no vehicle types are available', () => {
    fixture.componentRef.setInput('vehicleTypes', []);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const emptyContainer =
      fixture.nativeElement.querySelector('.empty-container');
    expect(emptyContainer).toBeTruthy();
    expect(emptyContainer.textContent).toContain('No vehicle types available');
  });

  it('should display vehicle types as chips when available', () => {
    fixture.componentRef.setInput('vehicleTypes', mockVehicleTypes);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const chips = fixture.nativeElement.querySelectorAll('mat-chip');
    expect(chips.length).toBe(2);
    expect(chips[0].textContent.trim()).toContain('Passenger Car');
    expect(chips[1].textContent.trim()).toContain('Truck');
  });

  it('should display card title with icon', () => {
    fixture.componentRef.setInput('vehicleTypes', []);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('mat-card-title');
    const icon = title.querySelector('mat-icon');

    expect(title.textContent).toContain('Vehicle Types');
    expect(icon.textContent).toBe('directions_car');
  });
});
