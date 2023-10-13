import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFullDetailComponent } from './course-full-detail.component';

describe('CourseFullDetailComponent', () => {
  let component: CourseFullDetailComponent;
  let fixture: ComponentFixture<CourseFullDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseFullDetailComponent]
    });
    fixture = TestBed.createComponent(CourseFullDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
