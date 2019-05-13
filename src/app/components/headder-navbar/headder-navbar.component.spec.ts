import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadderNavbarComponent } from './headder-navbar.component';

describe('HeadderNavbarComponent', () => {
  let component: HeadderNavbarComponent;
  let fixture: ComponentFixture<HeadderNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadderNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadderNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
