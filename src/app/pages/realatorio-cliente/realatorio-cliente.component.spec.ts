import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealatorioClienteComponent } from './realatorio-cliente.component';

describe('RealatorioClienteComponent', () => {
  let component: RealatorioClienteComponent;
  let fixture: ComponentFixture<RealatorioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealatorioClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealatorioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
