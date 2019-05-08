import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedDescargarRedComponent } from './red-descargar-red.component';

describe('RedDescargarRedComponent', () => {
  let component: RedDescargarRedComponent;
  let fixture: ComponentFixture<RedDescargarRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedDescargarRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedDescargarRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
