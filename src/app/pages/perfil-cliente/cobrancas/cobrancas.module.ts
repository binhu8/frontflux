import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CobrancasComponent } from './cobrancas.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskModule } from 'ngx-mask';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CobrancasComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    NgxMaskModule.forRoot(),
    MatDividerModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [
    CobrancasComponent
  ]
})
export class CobrancasModule { }
