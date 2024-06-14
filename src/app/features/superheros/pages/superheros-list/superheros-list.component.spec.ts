import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperherosListComponent } from './superheros-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('SuperherosListComponent', () => {
  let component: SuperherosListComponent;
  let fixture: ComponentFixture<SuperherosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuperherosListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SuperherosListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/superheros/new', () => {
    
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    component.goToNewSuperhero();

    expect( spy ).toHaveBeenCalledWith(['/superheros/new']);

  });

});
