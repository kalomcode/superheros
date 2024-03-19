import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroesListComponent } from './superheroes-list.component';

describe('SuperheroesListComponent', () => {
  let component: SuperheroesListComponent;
  let fixture: ComponentFixture<SuperheroesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuperheroesListComponent]
    });
    fixture = TestBed.createComponent(SuperheroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
