import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrisingticktComponent } from './adminrisingtickt.component';

describe('AdminrisingticktComponent', () => {
  let component: AdminrisingticktComponent;
  let fixture: ComponentFixture<AdminrisingticktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminrisingticktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminrisingticktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
