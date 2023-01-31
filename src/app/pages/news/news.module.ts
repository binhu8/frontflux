import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatSidenavModule,
    ToolbarModule,
    MenuModule,
    MatExpansionModule
  ]
})
export class NewsModule { }
