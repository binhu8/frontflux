import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../interceptors/loading.interceptor';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  exports: [LoadingComponent],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
export class LoadingModule { }
