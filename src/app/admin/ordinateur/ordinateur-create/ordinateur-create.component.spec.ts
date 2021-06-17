import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinateurCreateComponent } from './ordinateur-create.component';

describe('OrdinateurCreateComponent', () => {
  let component: OrdinateurCreateComponent;
  let fixture: ComponentFixture<OrdinateurCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinateurCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinateurCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
