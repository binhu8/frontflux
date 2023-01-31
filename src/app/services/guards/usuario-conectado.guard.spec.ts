import { TestBed } from '@angular/core/testing';

import { UsuarioConectadoGuard } from './usuario-conectado.guard';

describe('UsuarioConectadoGuard', () => {
  let guard: UsuarioConectadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioConectadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
