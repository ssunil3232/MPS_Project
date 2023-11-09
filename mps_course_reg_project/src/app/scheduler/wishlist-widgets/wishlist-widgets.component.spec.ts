import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistWidgetsComponent } from './wishlist-widgets.component';

describe('WishlistWidgetsComponent', () => {
  let component: WishlistWidgetsComponent;
  let fixture: ComponentFixture<WishlistWidgetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishlistWidgetsComponent]
    });
    fixture = TestBed.createComponent(WishlistWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
