import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceProyectoComponent } from './avance-proyecto.component';

describe('AvanceProyectoComponent', () => {
  let component: AvanceProyectoComponent;
  let fixture: ComponentFixture<AvanceProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
