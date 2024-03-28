import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { superherosService } from './superheros.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Superhero } from '../interfaces';
import { environment } from 'src/environments/environment';

const listsuperherosMock: Superhero[] = [
  {
    "id": 1,
    "name": "Superman",
    "power": "Super fuerza",
    "identity": "Clark Kent",
    "city": "Metropolis",
    "status": "activo",
    "imgUrl": "https://img.asmedia.epimg.net/resizer/v2/SFEXHJ2VRBH7LKRM5KCNXCHSRU.jpg?auth=3648985309ecad46ae03879eec8ca8ad8d73c8eec577f14f1a5b6a629f33f5d2&width=1472&height=828&smart=true"
  },
  {
    "id": 2,
    "name": "Batman",
    "power": "Inteligencia",
    "identity": "Bruce Wayne",
    "city": "Gotham",
    "status": "activo",
    "imgUrl": "https://i.blogs.es/cd20cf/1366_2000-9-/1366_2000.jpeg"
  },
  {
    "id": 3,
    "name": "Wonder Woman",
    "power": "Fuerza y destreza",
    "identity": "Diana Prince",
    "city": "Themyscira",
    "status": "activo",
    "imgUrl": "https://i.blogs.es/cd20cf/1366_2000-9-/1366_2000.jpeg"
  }
]

describe('superherosService', () => {

  let service: superherosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        superherosService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(superherosService);
  });

  beforeEach(() => {
    service = TestBed.inject(superherosService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify(); // Para que no haya peticiones pendientes entre tests
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getsuperheros return a list of superheros and does a get method', () => {
    service.getsuperheros().subscribe((resp: Superhero[]) => {
      expect(resp).toEqual(listsuperherosMock);
    });
    const req = httpMock.expectOne(`${ environment.baseUrl }/superheros`);
    expect(req.request.method).toBe('GET');
    req.flush(listsuperherosMock);
  });

  it('getSuperheroById return a superhero with id 3 and does a get method', () => {
    const id = '3'
    service.getSuperheroById(id).subscribe((resp: Superhero) => {
      expect(resp.id).toEqual(3);
      expect(resp.name).toEqual('Wonder Woman');
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheros/${ id }`);
    expect(req.request.method).toBe('GET');
    req.flush(listsuperherosMock.find(superhero => superhero.id === 3) || {});
  })

  it('createSuperhero return a superhero created an does a post method', () => {
    const newsuperhero: Superhero = {
      name: 'SpiderMan',
      power: 'Fuerza y destreza',
      identity: 'Peter',
      city: 'Nueva York',
      status: 'activo',
      imgUrl: 'https://i.blogs.es/cd20cf/1366_2000-9-/1366_2000.jpeg'
    }
    service.createSuperhero(newsuperhero).subscribe((resp: Superhero) => {
      expect(resp.id).toEqual(4);
      expect(resp.name).toEqual('SpiderMan');
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheros`);
    expect(req.request.method).toBe('POST');
    newsuperhero.id = 4
    req.flush(newsuperhero);
  })

  it('updateSuperhero return a superhero id 3 updated an does a patch method', () => {
    const updatedsuperhero: Superhero = {
      id: 3,
      name: 'SpiderMan',
      power: 'Fuerza y destreza',
      identity: 'Peter',
      city: 'Nueva York',
      status: 'activo',
      imgUrl: 'https://i.blogs.es/cd20cf/1366_2000-9-/1366_2000.jpeg'
    }
    service.updateSuperhero(updatedsuperhero).subscribe((resp: Superhero) => {
      expect(resp.id).toEqual(3);
      expect(resp.name).toEqual('SpiderMan');
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheros/${ updatedsuperhero.id }`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedsuperhero);
  })

  it('deletesuperheroById return a superhero id 3 updated an does a delete method', () => {
    const id = '3';
    service.deletesuperheroById(id).subscribe((resp) => {
      expect(resp).toBeTruthy();
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheros/${ id }`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  })

  it('deletesuperheroById error trying to delete a superhero that does not exist', (done: DoneFn) => {
    const id = '5';
    
    service.getSuperheroById(id).subscribe({
      next: () => {
        done.fail('Se esperaba un error pero la suscripción tuvo éxito');
      },
      error: (error) => {
        expect(error).toBeDefined();
        done();
      }
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheros/${ id }`);
    expect(req.request.method).toBe('GET');
    req.error(new ProgressEvent('Error superhero no encontrado'))
  });

  it('deletesuperheroById error trying to delete a superhero that does not exist', (done: DoneFn) => {
    const id = '5';
    
    service.deletesuperheroById(id).subscribe({
      next: () => {
        done.fail('Se esperaba un error pero la suscripción tuvo éxito');
      },
      error: (error) => {
        expect(error).toBeDefined();
        done();
      }
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheros/${ id }`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ProgressEvent('Error superhero no encontrado'))
  });

});
