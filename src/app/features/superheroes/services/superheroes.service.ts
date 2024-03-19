import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Superhero } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  getSuperheroes(): Observable<Superhero[]> {
    console.log('getSuperheroessvv')
    return this.http.get<Superhero[]>(`${ this.baseUrl }/superheroes`)
  }

}
