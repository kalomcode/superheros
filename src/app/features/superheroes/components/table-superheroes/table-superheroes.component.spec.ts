import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSuperheroesComponent } from './table-superheroes.component';

describe('TableSuperheroesComponent', () => {
  let component: TableSuperheroesComponent;
  let fixture: ComponentFixture<TableSuperheroesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableSuperheroesComponent]
    });
    fixture = TestBed.createComponent(TableSuperheroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
