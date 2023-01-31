import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeusClientesRoutingModule } from './meus-clientes-routing.module';
import { MeusClientesComponent } from './meus-clientes.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddEventModule } from '../add-event/add-event.module';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { ProfileModule } from 'src/app/components/profile/profile.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioButton, MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';


@NgModule({
  declarations: [
    MeusClientesComponent
  ],
  imports: [
    CommonModule,
    MeusClientesRoutingModule,
    FullCalendarModule, 
    AddEventModule,
    MenuModule,
    ProfileModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ClipboardModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    ToolbarModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeusClientesModule { }
