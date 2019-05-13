import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsAssignComponent } from './tickets-assign.component';

describe('TicketsAssignComponent', () => {
  let component: TicketsAssignComponent;
  let fixture: ComponentFixture<TicketsAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
