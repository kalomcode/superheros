import { ComponentFixture, TestBed } from '@angular/core/testing';

import { superherosListComponent } from './superheros-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('superherosListComponent', () => {
  let component: superherosListComponent;
  let fixture: ComponentFixture<superherosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [superherosListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(superherosListComponent);
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
