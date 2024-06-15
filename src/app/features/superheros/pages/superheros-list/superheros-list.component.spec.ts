import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperherosListComponent } from './superheros-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { SuperherosService } from '../../services/superheros.service';
import { SuperherosServiceMock } from '../../testing/mocks';

describe('SuperherosListComponent', () => {
  let component: SuperherosListComponent;
  let fixture: ComponentFixture<SuperherosListComponent>;
  let router: Router;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [SuperherosListComponent],
      providers: [
        provideRouter([]),
        provideAnimations(),
        { provide: SuperherosService, useClass: SuperherosServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SuperherosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/superheros/new', () => {
    const spy = spyOn(router, 'navigate');

    component.goToNewSuperhero();

    expect( spy ).toHaveBeenCalledWith(['/superheros/new']);

  });

});
