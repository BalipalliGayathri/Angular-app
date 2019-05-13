import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertickstatusComponent } from './usertickstatus.component';

describe('UsertickstatusComponent', () => {
  let component: UsertickstatusComponent;
  let fixture: ComponentFixture<UsertickstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertickstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertickstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
