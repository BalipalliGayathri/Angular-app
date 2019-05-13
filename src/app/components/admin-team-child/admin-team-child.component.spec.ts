import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamChildComponent } from './admin-team-child.component';

describe('AdminTeamChildComponent', () => {
  let component: AdminTeamChildComponent;
  let fixture: ComponentFixture<AdminTeamChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeamChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
