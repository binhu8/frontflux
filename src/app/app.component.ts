import { Component, OnInit } from '@angular/core';import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
7
import ptBr from '@fullcalendar/core/locales/pt-br'
import { EventService } from './services/event/event.service';
import { UserDataService } from './services/user-data/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  userData: any = {}
  constructor(private userdataService: UserDataService){

  }

  ngOnInit(): void {
    this.userData = this.userdataService.getUserData()
  }
}