import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWidgetsComponent } from './course-widgets.component';

describe('CourseWidgetsComponent', () => {
  let component: CourseWidgetsComponent;
  let fixture: ComponentFixture<CourseWidgetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseWidgetsComponent]
    });
    fixture = TestBed.createComponent(CourseWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
