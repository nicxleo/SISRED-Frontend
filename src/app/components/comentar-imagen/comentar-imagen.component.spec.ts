import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarImagenComponent } from './comentar-imagen.component';

describe('ComentarImagenComponent', () => {
  let component: ComentarImagenComponent;
  let fixture: ComponentFixture<ComentarImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
