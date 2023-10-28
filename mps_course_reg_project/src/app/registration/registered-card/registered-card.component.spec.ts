import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCardComponent } from './registered-card.component';

describe('RegisteredCardComponent', () => {
  let component: RegisteredCardComponent;
  let fixture: ComponentFixture<RegisteredCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredCardComponent]
    });
    fixture = TestBed.createComponent(RegisteredCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
