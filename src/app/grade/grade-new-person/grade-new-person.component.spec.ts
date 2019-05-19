import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeNewPersonComponent } from './grade-new-personcomponent';

describe('GradeNewPersonComponent', () => {
  let component: GradeNewPersonComponent;
  let fixture: ComponentFixture<GradeNewPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeNewPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeNewPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
