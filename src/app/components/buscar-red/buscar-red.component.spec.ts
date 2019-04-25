import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRedComponent } from './buscar-red.component';

describe('BuscarRedComponent', () => {
  let component: BuscarRedComponent;
  let fixture: ComponentFixture<BuscarRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
