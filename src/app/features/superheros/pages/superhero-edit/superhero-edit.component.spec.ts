import { ComponentFixture, TestBed } from '@angular/core/testing';

import { superheroEditComponent } from './superhero-edit.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { superherosService } from '../../services/superheros.service';
import { Superhero } from '../../interfaces';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

const superheroMock: Superhero = {
  "id": 1,
  "name": "Superman",
  "power": "Super fuerza",
  "identity": "Clark Kent",
  "city": "Metropolis",
  "status": "activo",
  "imgUrl": "https://img.asmedia.epimg.net/resizer/v2/SFEXHJ2VRBH7LKRM5KCNXCHSRU.jpg?auth=3648985309ecad46ae03879eec8ca8ad8d73c8eec577f14f1a5b6a629f33f5d2&width=1472&height=828&smart=true"
}

class MatSnackBarMock {
  open(message: string, action: string, config: any): any {
    return {
      afterDismissed: () => of(true),
      onAction: () => of(true)
    };
  }
}

describe('superheroEditComponent', () => {
  let component: superheroEditComponent;
  let fixture: ComponentFixture<superheroEditComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let superherosSvc: superherosService;
  let snackbarMock: MatSnackBarMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [superheroEditComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideAnimations(),
        superherosService,
        { provide: MatSnackBar, useClass: MatSnackBarMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(superheroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    superherosSvc = TestBed.inject(superherosService);
    snackbarMock = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set isEdit to true and call getSuperheroById with "123" when URL contains "superheros/edit/:id"', () => {
    const id = '123'
    spyOnProperty(router, 'url').and.returnValue(`/superheros/edit/${id}`);
    const routeSpy = spyOn(route.snapshot.paramMap, 'get').and.returnValue(id);
    const getSuperheroByIdSpy = spyOn(component, 'getSuperheroById');
    
    component.ngOnInit();

    expect( routeSpy ).toHaveBeenCalledWith('id');
    expect( component.isEdit() ).toBeTrue();
    expect( getSuperheroByIdSpy ).toHaveBeenCalledWith(id);
  });

  it('ngOnInit should set isEdit to true and navigate to "/superheros/list" when URL is "superheros/edit"', () => {
    spyOnProperty(router, 'url').and.returnValue(`/superheros/edit`);
    const routerSpy = spyOn(router, 'navigate');
    const routeSpy = spyOn(route.snapshot.paramMap, 'get').and.returnValue(null);
    
    component.ngOnInit();

    expect( routeSpy ).toHaveBeenCalledWith('id');
    expect( component.isEdit() ).toBeTrue();
    expect( routerSpy ).toHaveBeenCalledWith(['/superheros/list']);
  });

  it('ngOnInit should return early and not execute further logic when URL does not contain "edit"', () => {
    spyOnProperty(router, 'url').and.returnValue(`/superheros/new`);
    const routerSpy = spyOn(router, 'navigate');
    const routeSpy = spyOn(route.snapshot.paramMap, 'get');
    const getSuperheroByIdSpy = spyOn(component, 'getSuperheroById');
    
    component.ngOnInit();

    expect( component.isEdit() ).toBeFalse();
    expect( routerSpy ).not.toHaveBeenCalled();
    expect( routeSpy ).not.toHaveBeenCalled();
    expect( getSuperheroByIdSpy ).not.toHaveBeenCalled();
  });

  it('getSuperheroById should navigate to list if superhero is not found', () => {
    const superherosSvcSpy = spyOn(superherosSvc, 'getSuperheroById').and.returnValue(of(null as any));
    const routerSpy = spyOn(router, 'navigate');

    const id = '1';

    component.getSuperheroById(id);

    expect( superherosSvcSpy ).toHaveBeenCalledWith(id);
    expect( routerSpy ).toHaveBeenCalledWith(['/superheros/list']);
  });

  it('getSuperheroById should reset superheroForm if superhero is not null', () => {
    const superherosSvcSpy = spyOn(superherosSvc, 'getSuperheroById').and.returnValue(of(superheroMock));

    const id = '1'

    component.getSuperheroById('1');

    expect( superherosSvcSpy ).toHaveBeenCalledWith(id);
    expect(component.superheroForm.value).toEqual(superheroMock);
  });

  it('getSuperheroById should navigate to /superheros/list if an error occurs while fetching superhero', () => {
    const superherosSvcSpy = spyOn(superherosSvc, 'getSuperheroById').and.returnValue(throwError(() => new Error('Error')));
    const routerSpy = spyOn(router, 'navigate');
    const showrSnackbarErrorSpy = spyOn(component, 'showrSnackbarError');

    const id = '1';

    component.getSuperheroById(id);

    expect( superherosSvcSpy ).toHaveBeenCalledWith(id);
    expect( routerSpy ).toHaveBeenCalledWith(['/superheros/list']);
    expect( showrSnackbarErrorSpy ).toHaveBeenCalledWith('Se ha producido un error al intentar obtener le superhéroe');
  });

  it('onSubmit should call onSubmit() when the button is clicked', () => {
    const onSubmitSpy = spyOn(component, 'onSubmit');
    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    expect(onSubmitSpy).toHaveBeenCalled();
  });

  it('onSubmit should submit form and call updateSuperhero when isEdit is true and form is valid', () => {
    const superheroVaild = {...superheroMock};
    spyOn(router, 'navigate');
    const superherosSvcSpy = spyOn(superherosSvc, 'updateSuperhero').and.returnValue(of(superheroVaild));
    component.superheroForm.setValue(superheroVaild);
    component.isEdit.set(true);

    component.onSubmit();

    expect(superherosSvcSpy).toHaveBeenCalledWith(superheroVaild);
  });

  it('onSubmit should submit form and call createSuperhero when isEdit is false and form is valid', () => {
    const superheroVaild = {...superheroMock};
    spyOn(router, 'navigate');
    const superherosSvcSpy = spyOn(superherosSvc, 'createSuperhero').and.returnValue(of(superheroVaild));
    component.superheroForm.setValue(superheroVaild);
    component.isEdit.set(false);

    component.onSubmit();

    expect(component.superheroForm.valid).toBeTruthy();
    expect(superherosSvcSpy).toHaveBeenCalledWith(superheroVaild);
  });

  it('should return early if superheroForm is invalid', () => {
    const superheroInValid = {...superheroMock};
    superheroInValid.name = '';
    spyOn(router, 'navigate');
    const superherosSvcUpdateSpy = spyOn(superherosSvc, 'updateSuperhero').and.returnValue(of(superheroInValid));
    const superherosSvcCreateSpy = spyOn(superherosSvc, 'createSuperhero').and.returnValue(of(superheroInValid));
    const showrSnackbarErrorSpy = spyOn(component, 'showrSnackbarError');
    component.superheroForm.setValue(superheroInValid);

    component.onSubmit();

    expect(component.superheroForm.valid).toBeFalsy();
    expect(superherosSvcUpdateSpy).not.toHaveBeenCalled();
    expect(superherosSvcCreateSpy).not.toHaveBeenCalled();
    expect( showrSnackbarErrorSpy ).toHaveBeenCalledWith('Formulario inválido', 1000);
  });

});
