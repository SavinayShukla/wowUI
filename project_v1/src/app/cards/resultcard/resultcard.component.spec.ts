import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultcardComponent } from './resultcard.component';

describe('ResultcardComponent', () => {
  let component: ResultcardComponent;
  let fixture: ComponentFixture<ResultcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
