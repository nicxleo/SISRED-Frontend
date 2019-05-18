import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProyectosConectateComponent } from './dashboard-proyectos-conectate.component';

describe('DashboardProyectosConectateComponent', () => {
  let component: DashboardProyectosConectateComponent;
  let fixture: ComponentFixture<DashboardProyectosConectateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProyectosConectateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProyectosConectateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
