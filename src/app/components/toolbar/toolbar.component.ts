import { Component, Input, OnInit } from '@angular/core';
import { MenuItemToolbar } from 'src/app/models/menu-item-toolbar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() drawer: any
  @Input() menuItems: MenuItemToolbar[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
