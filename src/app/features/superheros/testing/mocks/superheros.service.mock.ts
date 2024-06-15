import { of } from "rxjs";
import { Superhero } from "../../interfaces";
import { listSuperherosMock, superheroMock } from ".";

export class SuperherosServiceMock {
  getsuperheros() {
    return of(listSuperherosMock);
  }
  getSuperheroById(id: string) {
    return of(superheroMock);
  }
  updateSuperhero(superhero: Superhero) {
    return of(superheroMock);
  }
  createSuperhero(superhero: Superhero) {
    return of(superheroMock);
  }
}