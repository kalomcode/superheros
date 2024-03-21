import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Superhero } from '../interfaces';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  getSuperheroes() {
    return this.http.get<Superhero[]>(`${ this.baseUrl }/superheroes`);
  }

  getSuperheroById(id: string) {
    return this.http.get<Superhero>(`${ this.baseUrl }/superheroes/${ id }`);
  }

  createSuperhero( superhero: Superhero ) {
    return this.http.post<Superhero>(`${ this.baseUrl }/superheroes`, superhero );
  }

  updateSuperhero( superhero: Superhero ) {
    return this.http.patch<Superhero>(`${ this.baseUrl }/superheroes/${ superhero.id }`, superhero );
  }

  deletesuperheroById( id: string ) {
    return this.http.delete(`${ this.baseUrl }/superheroes/${ id }`);
  }

}
