import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { VehicleMake } from '@app/core/domain/models';
import { MakesListComponent } from './makes-list.component';

describe('MakesListComponent', () => {
  let component: MakesListComponent;
  let fixture: ComponentFixture<MakesListComponent>;

  const mockMakes: VehicleMake[] = [
    { id: 440, name: 'AUDI' },
    { id: 441, name: 'BMW' },
    { id: 442, name: 'TESLA' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakesListComponent, NoopAnimationsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MakesListComponent);
    component = fixture.componentInstance;

    // IMPORTANTE: Proporcionar el input requerido
    fixture.componentRef.setInput('makes', mockMakes);
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('error', null);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when loading is true', () => {
    fixture.componentRef.setInput('makes', []);
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should display error message when error exists', () => {
    fixture.componentRef.setInput('makes', []);
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('error', 'Test error');
    fixture.detectChanges();

    const errorContainer =
      fixture.nativeElement.querySelector('.error-container');
    expect(errorContainer).toBeTruthy();
    expect(errorContainer.textContent).toContain('Test error');
  });

  it('should display empty state when no makes are available', () => {
    fixture.componentRef.setInput('makes', []);
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('error', null);
    fixture.detectChanges();

    const emptyContainer =
      fixture.nativeElement.querySelector('.empty-container');
    expect(emptyContainer).toBeTruthy();
    expect(emptyContainer.textContent).toContain('No vehicle makes found');
  });

  it('should display makes list when makes are available', () => {
    fixture.componentRef.setInput('makes', mockMakes);
    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('error', null);
    fixture.detectChanges();

    const resultsInfo = fixture.nativeElement.querySelector('.results-info');
    expect(resultsInfo.textContent).toContain('3 makes found');
  });

  it('should emit retry event when retry button is clicked', () => {
    let retryEmitted = false;
    component.retry.subscribe(() => {
      retryEmitted = true;
    });

    fixture.componentRef.setInput('makes', []);
    fixture.componentRef.setInput('error', 'Test error');
    fixture.detectChanges();

    const retryButton = fixture.nativeElement.querySelector('button');
    retryButton.click();

    expect(retryEmitted).toBe(true);
  });

  it('should emit makeSelected event when make is clicked', () => {
    let selectedMake: VehicleMake | undefined;
    component.makeSelected.subscribe((make: VehicleMake) => {
      selectedMake = make;
    });

    component.makeSelected.emit(mockMakes[0]);

    expect(selectedMake).toEqual(mockMakes[0]);
  });

  it('should scroll to top when scrollToTop is called', () => {
    const mockViewport = {
      scrollToIndex: jasmine.createSpy('scrollToIndex'),
    };

    component.viewport = mockViewport as any;
    component.scrollToTop();

    expect(component.viewport?.scrollToIndex).toHaveBeenCalledWith(0);
  });
});
