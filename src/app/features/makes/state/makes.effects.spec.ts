import { TestBed } from '@angular/core/testing';
import { VehicleMake } from '@app/core/domain/models';
import {
  GET_MAKES_USE_CASE,
  SEARCH_MAKES_USE_CASE,
} from '@app/core/domain/ports/inbound';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { MakesActions } from './makes.actions';
import { MakesEffects } from './makes.effects';

describe('MakesEffects', () => {
  let actions$: Observable<any>;
  let effects: MakesEffects;
  let getMakesUseCase: jasmine.SpyObj<any>;
  let searchMakesUseCase: jasmine.SpyObj<any>;

  const mockMakes: VehicleMake[] = [
    { id: 440, name: 'AUDI' },
    { id: 441, name: 'BMW' },
  ];

  beforeEach(() => {
    const getMakesSpy = jasmine.createSpyObj('GetMakesUseCase', ['execute']);
    const searchMakesSpy = jasmine.createSpyObj('SearchMakesUseCase', [
      'execute',
    ]);

    TestBed.configureTestingModule({
      providers: [
        MakesEffects,
        provideMockActions(() => actions$),
        { provide: GET_MAKES_USE_CASE, useValue: getMakesSpy },
        { provide: SEARCH_MAKES_USE_CASE, useValue: searchMakesSpy },
      ],
    });

    effects = TestBed.inject(MakesEffects);
    getMakesUseCase = TestBed.inject(GET_MAKES_USE_CASE) as jasmine.SpyObj<any>;
    searchMakesUseCase = TestBed.inject(
      SEARCH_MAKES_USE_CASE
    ) as jasmine.SpyObj<any>;
  });

  describe('loadMakes$', () => {
    it('should dispatch loadMakesSuccess on successful load', (done) => {
      getMakesUseCase.execute.and.returnValue(of(mockMakes));
      actions$ = of(MakesActions.loadMakes());

      effects.loadMakes$.subscribe((action) => {
        expect(action).toEqual(
          MakesActions.loadMakesSuccess({ makes: mockMakes })
        );
        done();
      });
    });

    it('should dispatch loadMakesFailure on error', (done) => {
      const error = new Error('Test error');
      getMakesUseCase.execute.and.returnValue(throwError(() => error));
      actions$ = of(MakesActions.loadMakes());

      effects.loadMakes$.subscribe((action) => {
        expect(action).toEqual(
          MakesActions.loadMakesFailure({ error: 'Test error' })
        );
        done();
      });
    });
  });

  describe('searchMakes$', () => {
    it('should dispatch searchMakesSuccess with filtered results', (done) => {
      searchMakesUseCase.execute.and.returnValue(of([mockMakes[0]]));
      actions$ = of(MakesActions.searchMakes({ query: 'AUDI' }));

      effects.searchMakes$.subscribe((action) => {
        expect(action).toEqual(
          MakesActions.searchMakesSuccess({ makes: [mockMakes[0]] })
        );
        done();
      });
    });
  });
});
