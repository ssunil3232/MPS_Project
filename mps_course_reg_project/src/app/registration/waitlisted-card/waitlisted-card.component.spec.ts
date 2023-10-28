import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistedCardComponent } from './waitlisted-card.component';

describe('WaitlistedCardComponent', () => {
  let component: WaitlistedCardComponent;
  let fixture: ComponentFixture<WaitlistedCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitlistedCardComponent]
    });
    fixture = TestBed.createComponent(WaitlistedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
