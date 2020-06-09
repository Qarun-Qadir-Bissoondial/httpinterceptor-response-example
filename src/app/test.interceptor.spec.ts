import { TestBed } from '@angular/core/testing';
import { TestInterceptor } from './test.interceptor';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('TestInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TestInterceptor,
          multi: true
        }
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    // const interceptor: TestInterceptor = TestBed.inject(TestInterceptor);
    // expect(interceptor).toBeTruthy();
  });

  it.only('should make a GET request', (done) => {
    const s = httpClient.get('/my-endpoint').subscribe(
      data => {
        expect(data).toBeDefined();
        expect(data).toEqual({message: 'message'});
        console.log(data);
        done(); },
      error => { fail(error.message) },
      () => { done() }
    );

    const request = httpMock.expectOne('/my-endpoint');
    expect(request.request.method).toBe('GET');
    request.flush({message: 'message'});
    // s.unsubscribe();
  });
});
