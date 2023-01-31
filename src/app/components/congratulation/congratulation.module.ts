import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongratulationRoutingModule } from './congratulation-routing.module';
import { CongratulationComponent } from './congratulation.component';


@NgModule({
  declarations: [
    CongratulationComponent
  ],
  imports: [
    CommonModule,
    CongratulationRoutingModule
  ]
})
export class CongratulationModule { }
