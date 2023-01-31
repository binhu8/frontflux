import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealatorioClienteRoutingModule } from './realatorio-cliente-routing.module';
import { RealatorioClienteComponent } from './realatorio-cliente.component';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskModule } from 'ngx-mask';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RealatorioClienteComponent
  ],
  imports: [
    CommonModule,
    RealatorioClienteRoutingModule,
    RouterModule,
    MatDividerModule,
    NgxMaskModule.forRoot(),
    MatDividerModule,
    ClipboardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class RealatorioClienteModule { }
