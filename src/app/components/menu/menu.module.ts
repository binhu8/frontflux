import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CalendarModule } from 'src/app/pages/calendar/calendar.module';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ProfileModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    RouterModule,
    MatMenuModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
