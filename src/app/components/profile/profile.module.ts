import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
