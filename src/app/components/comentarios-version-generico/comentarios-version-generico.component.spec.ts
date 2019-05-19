import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosVersionGenericoComponent } from './comentarios-version-generico.component';

describe('ComentariosVersionGenericoComponent', () => {
  let component: ComentariosVersionGenericoComponent;
  let fixture: ComponentFixture<ComentariosVersionGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosVersionGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosVersionGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
