import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Calendar, eventTupleToStore } from '@fullcalendar/angular';
import { EventService } from 'src/app/services/event/event.service';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  

  public picker: any = ''

  public form: FormGroup = new FormGroup({
    date: new FormControl(''),
    title: new FormControl(''),
    time: new FormControl(''),
    crp: new FormControl('')
  })

  constructor( private eventService: EventService, private router: Router,  ) { }

  ngOnInit(): void {
  }

  addNewEvent(){
    let userData: any = localStorage.getItem('userData')
    let userObj = JSON.parse(userData)
    this.form.value.crp = userObj.crp

    let ano:any  = this.form.value.date.getFullYear();
    let mes:any  = this.form.value.date.getMonth() + 1;
    let dia:any  = this.form.value.date.getDate() ;

    let dateTime = `${ano}-${mes < 10 ? `0${mes}`: mes}-${dia < 10 ? `0${dia}`: dia}T${this.form.value.time}`
    this.form.value.date = dateTime
    
    this.eventService.addEvent(this.form.value).subscribe(res => {
      location.reload()
    })
    
  }
  cancel(){
    location.reload()
  }
}
