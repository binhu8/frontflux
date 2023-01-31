import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'
import { AddEventComponent } from '../add-event/add-event.component';
import { AddEventModule } from '../add-event/add-event.module';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { ProfileModule } from 'src/app/components/profile/profile.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputSearchModule } from './input-search/input-search.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';




FullCalendarModule.registerPlugins([
  dayGridPlugin
])

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule, 
    AddEventModule,
    MenuModule,
    ProfileModule,
    FontAwesomeModule,
    InputSearchModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    ProfileModule,
    ToolbarModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarModule { }
