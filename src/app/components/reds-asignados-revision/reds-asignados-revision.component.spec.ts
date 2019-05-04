import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedsAsignadosRevisionComponent } from './reds-asignados-revision.component';

describe('RedsAsignadosRevisionComponent', () => {
  let component: RedsAsignadosRevisionComponent;
  let fixture: ComponentFixture<RedsAsignadosRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedsAsignadosRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedsAsignadosRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
