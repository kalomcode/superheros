import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SuperheroesService } from './superheroes.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Superhero } from '../interfaces';
import { environment } from 'src/environments/environment.development';

const listSuperheroesMock: Superhero[] = [
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

describe('SuperheroesService', () => {

  let service: SuperheroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SuperheroesService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(SuperheroesService);
  });

  beforeEach(() => {
    service = TestBed.inject(SuperheroesService);
    httpMock = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify(); // Para que no haya peticiones pendientes entre tests
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getSuperheroes return a list of superheroes and does a get method', () => {
    service.getSuperheroes().subscribe((resp: Superhero[]) => {
      expect(resp).toEqual(listSuperheroesMock);
    });
    const req = httpMock.expectOne(`${ environment.baseUrl }/superheroes`);
    expect(req.request.method).toBe('GET');
    req.flush(listSuperheroesMock);
  });

  it('getSuperheroById return a superhero with id 3 and does a get method', () => {
    const id = '3'
    service.getSuperheroById(id).subscribe((resp: Superhero) => {
      expect(resp.id).toEqual(3);
      expect(resp.name).toEqual('Wonder Woman');
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheroes/${ id }`);
    expect(req.request.method).toBe('GET');
    req.flush(listSuperheroesMock.find(superhero => superhero.id === 3) || {});
  })

  it('createSuperhero return a superhero created an does a post method', () => {
    const newSuperheroe: Superhero = {
      name: 'SpiderMan',
      power: 'Fuerza y destreza',
      identity: 'Peter',
      city: 'Nueva York',
      status: 'activo',
      imgUrl: 'https://i.blogs.es/cd20cf/1366_2000-9-/1366_2000.jpeg'
    }
    service.createSuperhero(newSuperheroe).subscribe((resp: Superhero) => {
      expect(resp.id).toEqual(4);
      expect(resp.name).toEqual('SpiderMan');
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheroes`);
    expect(req.request.method).toBe('POST');
    newSuperheroe.id = 4
    req.flush(newSuperheroe);
  })

  it('updateSuperhero return a superhero id 3 updated an does a patch method', () => {
    const updatedSuperheroe: Superhero = {
      id: 3,
      name: 'SpiderMan',
      power: 'Fuerza y destreza',
      identity: 'Peter',
      city: 'Nueva York',
      status: 'activo',
      imgUrl: 'https://i.blogs.es/cd20cf/1366_2000-9-/1366_2000.jpeg'
    }
    service.updateSuperhero(updatedSuperheroe).subscribe((resp: Superhero) => {
      expect(resp.id).toEqual(3);
      expect(resp.name).toEqual('SpiderMan');
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheroes/${ updatedSuperheroe.id }`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedSuperheroe);
  })

  it('deletesuperheroById return a superhero id 3 updated an does a delete method', () => {
    const id = '3';
    service.deletesuperheroById(id).subscribe((resp) => {
      expect(resp).toBeTruthy();
    });

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheroes/${ id }`);
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

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheroes/${ id }`);
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

    const req = httpMock.expectOne(`${ environment.baseUrl }/superheroes/${ id }`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ProgressEvent('Error superhero no encontrado'))
  });

});
