import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOrdersComponent } from './comp-orders.component';

describe('CompOrdersComponent', () => {
  let component: CompOrdersComponent;
  let fixture: ComponentFixture<CompOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
