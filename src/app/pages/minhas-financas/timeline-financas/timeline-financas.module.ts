import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineFinancasComponent } from './timeline-financas.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    TimelineFinancasComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    TimelineFinancasComponent
  ]
})
export class TimelineFinancasModule { }
