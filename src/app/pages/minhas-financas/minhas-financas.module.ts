import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhasFinancasRoutingModule } from './minhas-financas-routing.module';
import { MinhasFinancasComponent } from './minhas-financas.component';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';
import { TimelineFinancasModule } from './timeline-financas/timeline-financas.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    MinhasFinancasComponent
  ],
  imports: [
    CommonModule,
    MinhasFinancasRoutingModule,
    MenuModule,
    MatTableModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    TimelineFinancasModule,
    ToolbarModule,
    MatSidenavModule
  ]
})
export class MinhasFinancasModule { }
