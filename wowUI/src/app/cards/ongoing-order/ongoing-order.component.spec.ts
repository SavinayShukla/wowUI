import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingOrderComponent } from './ongoing-order.component';

describe('OngoingOrderComponent', () => {
  let component: OngoingOrderComponent;
  let fixture: ComponentFixture<OngoingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OngoingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
