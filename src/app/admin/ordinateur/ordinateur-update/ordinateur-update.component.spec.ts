import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinateurUpdateComponent } from './ordinateur-update.component';

describe('OrdinateurUpdateComponent', () => {
  let component: OrdinateurUpdateComponent;
  let fixture: ComponentFixture<OrdinateurUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinateurUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinateurUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
