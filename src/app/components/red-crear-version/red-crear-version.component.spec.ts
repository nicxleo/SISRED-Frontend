import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedCrearVersionComponent } from './red-crear-version.component';

describe('RedCrearVersionComponent', () => {
  let component: RedCrearVersionComponent;
  let fixture: ComponentFixture<RedCrearVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedCrearVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedCrearVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
