import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VerAvanceConectateComponent} from './ver-avance-conectate.component';

describe('VerAvanceConectateComponent', () => {
  let component: VerAvanceConectateComponent;
  let fixture: ComponentFixture<VerAvanceConectateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerAvanceConectateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAvanceConectateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
