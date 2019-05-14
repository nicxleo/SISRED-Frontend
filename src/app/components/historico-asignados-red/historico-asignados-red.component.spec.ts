import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAsignadosRedComponent } from './historico-asignados-red.component';

describe('HistoricoAsignadosRedComponent', () => {
  let component: HistoricoAsignadosRedComponent;
  let fixture: ComponentFixture<HistoricoAsignadosRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoAsignadosRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoAsignadosRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
