import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NhtsaApiService } from './nhtsa-api.service';

describe('NhtsaApiService', () => {
  let service: NhtsaApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), NhtsaApiService],
    });
    service = TestBed.inject(NhtsaApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all makes', () => {
    const mockResponse = {
      Count: 2,
      Message: 'Success',
      SearchCriteria: null,
      Results: [
        { Make_ID: 440, Make_Name: 'AUDI' },
        { Make_ID: 441, Make_Name: 'BMW' },
      ],
    };

    service.getAllMakes().subscribe((response) => {
      expect(response.Count).toBe(2);
      expect(response.Results.length).toBe(2);
    });

    const req = httpMock.expectOne((request) => request.url.includes('GetAllMakes'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
