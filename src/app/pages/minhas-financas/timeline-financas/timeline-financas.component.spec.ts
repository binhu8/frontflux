import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFinancasComponent } from './timeline-financas.component';

describe('TimelineFinancasComponent', () => {
  let component: TimelineFinancasComponent;
  let fixture: ComponentFixture<TimelineFinancasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineFinancasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineFinancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
