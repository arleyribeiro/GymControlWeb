import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeDashboadComponent } from './grade-dashboad.component';

describe('GradeDashboadComponent', () => {
  let component: GradeDashboadComponent;
  let fixture: ComponentFixture<GradeDashboadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeDashboadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
