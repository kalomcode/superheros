import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroesListComponent } from './superheroes-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('SuperheroesListComponent', () => {
  let component: SuperheroesListComponent;
  let fixture: ComponentFixture<SuperheroesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuperheroesListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SuperheroesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/superheroes/new', () => {
    
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.goToNewSuperhero();

    expect( spy ).toHaveBeenCalledWith(['/superheroes/new']);

  });

});
