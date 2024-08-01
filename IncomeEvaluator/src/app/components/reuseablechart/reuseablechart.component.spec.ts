import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableChartComponent } from './reuseablechart.component';

describe('ReuseablechartComponent', () => {
  let component: ReusableChartComponent;
  let fixture: ComponentFixture<ReusableChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
