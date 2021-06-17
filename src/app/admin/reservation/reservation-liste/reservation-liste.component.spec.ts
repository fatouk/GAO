import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationListeComponent } from './reservation-liste.component';

describe('ReservationListeComponent', () => {
  let component: ReservationListeComponent;
  let fixture: ComponentFixture<ReservationListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
