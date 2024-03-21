import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesuperherosComponent } from './table-superheros.component';

xdescribe('TablesuperherosComponent', () => {
  let component: TablesuperherosComponent;
  let fixture: ComponentFixture<TablesuperherosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TablesuperherosComponent]
    });
    fixture = TestBed.createComponent(TablesuperherosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
