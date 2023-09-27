import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCatalogComponent } from './course-catalog.component';

describe('CourseCatalogComponent', () => {
  let component: CourseCatalogComponent;
  let fixture: ComponentFixture<CourseCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCatalogComponent]
    });
    fixture = TestBed.createComponent(CourseCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
