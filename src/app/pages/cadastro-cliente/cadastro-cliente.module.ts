import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroClienteRoutingModule } from './cadastro-cliente-routing.module';
import { CadastroClienteComponent } from './cadastro-cliente.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CadastroClienteComponent
  ],
  imports: [
    CommonModule,
    CadastroClienteRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CadastroClienteModule { }
