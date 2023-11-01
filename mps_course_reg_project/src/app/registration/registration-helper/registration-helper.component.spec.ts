import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationHelperComponent } from './registration-helper.component';

describe('RegistrationHelperComponent', () => {
  let component: RegistrationHelperComponent;
  let fixture: ComponentFixture<RegistrationHelperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationHelperComponent]
    });
    fixture = TestBed.createComponent(RegistrationHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
