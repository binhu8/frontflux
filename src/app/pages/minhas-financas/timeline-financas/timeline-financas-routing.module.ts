import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineFinancasComponent } from './timeline-financas.component';

const routes: Routes = [{ path: '', component: TimelineFinancasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineFinancasRoutingModule { }
