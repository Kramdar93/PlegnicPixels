import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevcornerComponent } from './devcorner.component';

describe('DevcornerComponent', () => {
  let component: DevcornerComponent;
  let fixture: ComponentFixture<DevcornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevcornerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevcornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
