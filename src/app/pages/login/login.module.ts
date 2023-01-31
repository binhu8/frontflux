import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioNaoAutenticadoGuard } from 'src/app/services/guards/usuario-nao-autenticado.guard';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers:[
    UsuarioNaoAutenticadoGuard
  ]
})
export class LoginModule { }
