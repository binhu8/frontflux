import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineComponent } from './timeline.component';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularEditorModule
  ],
  exports: [
    TimelineComponent,
   
  ]
})
export class TimelineModule { }
