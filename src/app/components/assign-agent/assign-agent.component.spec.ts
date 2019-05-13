import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAgentComponent } from './assign-agent.component';

describe('AssignAgentComponent', () => {
  let component: AssignAgentComponent;
  let fixture: ComponentFixture<AssignAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
