import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinhasFinancasComponent } from './minhas-financas.component';

const routes: Routes = [{ path: '', component: MinhasFinancasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhasFinancasRoutingModule { }
