import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroeEditComponent } from './superheroe-edit.component';

describe('SuperheroeEditComponent', () => {
  let component: SuperheroeEditComponent;
  let fixture: ComponentFixture<SuperheroeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuperheroeEditComponent]
    });
    fixture = TestBed.createComponent(SuperheroeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
