import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealatorioClienteComponent } from './realatorio-cliente.component';

const routes: Routes = [{ path: '', component: RealatorioClienteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealatorioClienteRoutingModule { }
