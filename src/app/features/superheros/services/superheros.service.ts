import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Superhero } from '../interfaces';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class superherosService {
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  getsuperheros() {
    return this.http.get<Superhero[]>(`${ this.baseUrl }/superheros`);
  }

  getSuperheroById(id: string) {
    return this.http.get<Superhero>(`${ this.baseUrl }/superheros/${ id }`);
  }

  createSuperhero( superhero: Superhero ) {
    return this.http.post<Superhero>(`${ this.baseUrl }/superheros`, superhero );
  }

  updateSuperhero( superhero: Superhero ) {
    return this.http.patch<Superhero>(`${ this.baseUrl }/superheros/${ superhero.id }`, superhero );
  }

  deletesuperheroById( id: string ) {
    return this.http.delete(`${ this.baseUrl }/superheros/${ id }`);
  }

}
