import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVersionRedComponent } from './ver-version-red.component';

describe('VerVersionRedComponent', () => {
  let component: VerVersionRedComponent;
  let fixture: ComponentFixture<VerVersionRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerVersionRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerVersionRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
