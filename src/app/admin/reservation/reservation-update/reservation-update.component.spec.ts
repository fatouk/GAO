import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationUpdateComponent } from './reservation-update.component';

describe('ReservationUpdateComponent', () => {
  let component: ReservationUpdateComponent;
  let fixture: ComponentFixture<ReservationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
