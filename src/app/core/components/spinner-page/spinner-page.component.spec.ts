import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerPageComponent } from './spinner-page.component';

xdescribe('SpinnerPageComponent', () => {
  let component: SpinnerPageComponent;
  let fixture: ComponentFixture<SpinnerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerPageComponent]
    });
    fixture = TestBed.createComponent(SpinnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
