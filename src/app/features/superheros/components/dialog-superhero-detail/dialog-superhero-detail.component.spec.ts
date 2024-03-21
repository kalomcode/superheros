import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuperheroDetailComponent } from './dialog-superhero-detail.component';

xdescribe('DialogSuperheroDetailComponent', () => {
  let component: DialogSuperheroDetailComponent;
  let fixture: ComponentFixture<DialogSuperheroDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogSuperheroDetailComponent]
    });
    fixture = TestBed.createComponent(DialogSuperheroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
