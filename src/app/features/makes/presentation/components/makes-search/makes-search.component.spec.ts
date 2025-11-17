import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MakesSearchComponent } from './makes-search.component';

describe('MakesSearchComponent', () => {
  let component: MakesSearchComponent;
  let fixture: ComponentFixture<MakesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakesSearchComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MakesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event after debounce time', fakeAsync(() => {
    let emittedValue = '';
    component.search.subscribe((value: string) => {
      emittedValue = value;
    });

    // Simular escritura
    component.searchControl.setValue('B');
    tick(100); // No debería emitir aún
    expect(emittedValue).toBe('');

    component.searchControl.setValue('BM');
    tick(100);
    expect(emittedValue).toBe('');

    component.searchControl.setValue('BMW');
    tick(500); // Después de 500ms, debería emitir

    expect(emittedValue).toBe('BMW');
  }));

  it('should emit clear event when clear button is clicked', () => {
    let clearEmitted = false;
    component.clear.subscribe(() => {
      clearEmitted = true;
    });

    component.onClear();
    expect(clearEmitted).toBe(true);
  });

  it('should clear the search control value when onClear is called', () => {
    component.searchControl.setValue('BMW');
    component.onClear();
    expect(component.searchControl.value).toBe('');
  });

  it('should disable input when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(component.searchControl.disabled).toBe(true);
  });

  it('should enable input when disabled is false', () => {
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();

    expect(component.searchControl.enabled).toBe(true);
  });

  it('should not emit duplicate values', fakeAsync(() => {
    const emittedValues: string[] = [];
    component.search.subscribe((value: string) => {
      emittedValues.push(value);
    });

    component.searchControl.setValue('BMW');
    tick(500);

    component.searchControl.setValue('BMW'); // Mismo valor
    tick(500);

    // Solo debería emitir una vez
    expect(emittedValues.length).toBe(1);
    expect(emittedValues[0]).toBe('BMW');
  }));
});
