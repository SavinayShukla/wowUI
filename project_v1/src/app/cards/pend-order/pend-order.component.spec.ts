import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendOrderComponent } from './pend-order.component';

describe('PendOrderComponent', () => {
  let component: PendOrderComponent;
  let fixture: ComponentFixture<PendOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
