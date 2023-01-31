import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilClienteRoutingModule } from './perfil-cliente-routing.module';
import { PerfilClienteComponent } from './perfil-cliente.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';
import { TabsModule } from './tabs/tabs.module';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';


@NgModule({
  declarations: [
    PerfilClienteComponent
  ],
  imports: [
    CommonModule,
    PerfilClienteRoutingModule,
    FontAwesomeModule,
    MenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    TabsModule,
    MatSidenavModule,
    ToolbarModule
  ]
})
export class PerfilClienteModule { }
