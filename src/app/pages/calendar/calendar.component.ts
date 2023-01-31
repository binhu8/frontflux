import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/angular';
import ptBr from '@fullcalendar/core/locales/pt-br'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import { ChildActivationStart, Router, RouterLink } from '@angular/router';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { EventService } from 'src/app/services/event/event.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment'
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {
  

  @HostListener('document:click', ['$event.target']) clickout(target: any){
    if(this.el?.nativeElement.contains(target)){
      
      return
    }else{
      
      if(target.classList.contains('fc-event-time') || target.classList.contains('fc-event-title')){
        
        if(this.showNewEvent){
          this.showNewEvent = false
        }
        this.showModal = false
        return
      }else{
        if(target.classList.contains('fc-timeGridList-button')
         ||target.classList.contains('fc-timeGridWeek-button')
         ||target.classList.contains('fc-dayGridMonth-button')){
          this.closeEventModal()
          this.showModalEvent = false
          this.showNewEvent = false
        }
        console.log(target)
        if(this.newEvent.nativeElement.contains(target) || target.classList.contains('mat-option-text') 
        || target.classList.contains('mat-calendar-body-cell-content')
        || target.classList.contains('mat-icon-button') 
        || target.classList.contains('item') ){
          
          return
        }else{
          
          this.closeEventModal()
          this.showModal = false
          this.showNewEvent = false
        }
      }
    } 
  }

  @ViewChild('teste', {static: false} ) set content(content: ElementRef){
    if(content){
      this.el = content
      this.testeEventclick(this.event)
    }
  }
  @ViewChild('newEvent', {static: false} ) set _newEvent(content: ElementRef){
    if(content){
      this.newEvent = content
      this.testeDateClick()
    }
  }

  userData: any = {}
  toggle: boolean = false
  picker: any = ''
  showNewEvent: boolean = false
  newEvent!: ElementRef
  el!: ElementRef
  faClose = faCircleXmark
  showModal: boolean = false;
  showModalEvent: boolean =false
  event: any = {}
  events: any[] = []
  selectRepeatOptions = [
    {value: 1, viewValue: 'Diariamente'},
    {value: 7, viewValue: 'Semanalmente'},
    {value: 14, viewValue: 'Quizenalmente'},
    {value: 30, viewValue: 'Mensalmente'},
  ]

 
  form: FormGroup = new FormGroup({
    // date: new FormControl('', Validators.required),
    _id: new FormControl(''),
    time: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    valorConsulta: new FormControl('', Validators.required),
    crp: new FormControl('', ),
    cpfCliente: new FormControl(''),
    mes: new FormControl(''),
    ano: new FormControl(''),
    dia: new FormControl(''),
    realizado: new FormControl(false),
    pago: new FormControl(false),
    data: new FormControl(''),
    meet: new FormControl(''),
    color: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
    repeat: new FormControl(''),
    finalDate: new FormControl('')
  })

 

   calendarOptions: CalendarOptions = {
        
    eventClick: info => {
      // window.location.replace( info.event._def.extendedProps.meet)
      if(this.showModalEvent){
        this.showModalEvent = false
        this.testeEventclick(info)
        this.event = info
      }else{
        this.showModalEvent = true
        this.event = info
      }
    }, 
    eventMouseLeave: function(info){
      
    },
    eventDrop: arg => {
      this.updateEventService(arg)
    },
    eventResize: arg => {
      this.updateEventService(arg)
    },
    dateClick: info => {
      this.toggle = false
      if(this.showModalEvent || this.showNewEvent){
        this.showModalEvent = false
        this.showNewEvent = false
        this.closeEventModal()
        return
      }else{
        this.event = info
        this.showNewEvent = true
      }
    },
    windowResize: arg => {
      console.log(arg)
    },
    aspectRatio: 1,
    timeZone: 'UTC',
    navLinks: true,
    nowIndicator: true,
    editable: true,
    selectable: true,
    dayMaxEvents: true,
    businessHours: true,
    handleWindowResize: true,
    expandRows: false,
    dayMaxEventRows: true,
    droppable: true,
    locale: ptBr,
    initialView: 'timeGridWeek',
    themeSystem: 'bootstrap5',
    stickyHeaderDates: true,
    events: [],
    plugins:[ interactionPlugin, bootstrap5Plugin, timeGridPlugin, dayGridPlugin],
    headerToolbar: {
      end: 'prev,next',
      center: 'dayGridMonth,timeGridWeek'
    },
    buttonText: {
      next: '>',
      prev: '<'
    },
    
  }

 


  constructor( 
      private loadingService: LoadingService,
      private eventService: EventService,
      private _adapter: DateAdapter<any>,
      @Inject ( MAT_DATE_LOCALE) private _locale: string
    ) { }

  ngOnInit(): void {
    this.eventService.getEvents(localStorage.getItem('crp')).subscribe(res => {
       this.calendarOptions.events = res
    })
    this.ptBr()
  }

  ptBr(){
    this._locale = 'pt-BR'
    this._adapter.setLocale(this._locale)
  }


  testeDateClick(info?: any){
    let date = moment(this.event.date).format('DD/MM/YYYY')
    let time = moment(this.event.date).format('HH:mm')
    this.form.patchValue({start: this.event.dateStr, data: date, time: time})
  }

  testeEventclick(element: any){
    this.showModalEvent = true
    this.el.nativeElement.style.top = `${element.jsEvent.y -110 }px`
    this.el.nativeElement.style.left = `${element.jsEvent.x -100}px`
    this.form.patchValue({title: this.event.event._def.title})
    this.form.patchValue(this.event.event._def.extendedProps)
    this.form.patchValue({id: this.event.event._def.extendedProps._id})
    console.log(this.form.value)
  }


  updateEventService(arg: any){
    console.log(arg)
    let start = arg.event.startStr
    let end  = arg.event.endStr 
    

    let data = moment(start).format('DD/MM/YYYY')
    let dia = moment(start).format('DD')
    let mes = moment(start).format('MM')
    let ano = moment(start).format('YYYY')
    let time = moment(start).format('HH:mm')
    this.form.patchValue({start})
    this.form.patchValue({end})    
    this.form.patchValue(arg.event._def)
    this.form.patchValue(arg.event._def.extendedProps, )
    this.form.patchValue({data: data})
    this.form.patchValue({dia: dia})
    this.form.patchValue({mes: mes})
    this.form.patchValue({ano: ano})
    this.form.patchValue({time: time})

    this.eventService.updateEvent(this.form.value).subscribe(res => {
      console.log(res)
    })
  }

  deleteEvent(id: any){
    this.eventService.deletEvent(id).subscribe(res => {
      window.location.reload()
    })
  }

  toggleButton(event: boolean){
    this.toggle = event
  }

  setFinalDate(){
    
    this.events = []
    let currentDate: any = this.form.value.start
    let startDate:any = new Date(this.form.value.start)
    let endDate:any = new Date(this.form.value.finalDate) 
    let msDays = endDate - startDate
    let periodo = this.form.value.repeat
    let condition: Number = Math.floor( msDays / (1000 * 60 * 60 * 24 ) / periodo + 2)
    console.log(condition)

    for(let i =0; i< condition; i++){
      
      let date = new Date(currentDate)
      let data = moment(currentDate).format('DD/MM/YYYY')
      let dia = moment(currentDate).format('DD')
      let mes = moment(currentDate).format('MM')
      let ano = moment(currentDate).format('YYYY')
      this.form.patchValue({
        start: currentDate, 
        data: data, 
        dia: dia, 
        mes: mes, 
        ano: ano})
      this.events.push(this.form.value)
      let newDate: any = date.setDate(date.getDate()+periodo)
       newDate = new Date(newDate)
       currentDate = newDate
      }

      this.form.patchValue({start: this.events[0].start})
      console.log(this.events, 'eventos')
  }

  closeEventModal(){
    let res: any = {
    _id: '',
    time: '',
    title: '',
    valorConsulta: '',
    crp: '',
    cpfCliente: '',
    mes: '',
    ano: '',
    dia: '',
    realizado: false,
    pago: false,
    data: '',
    meet: '',
    color: '',
    start: '',
    end: '',
    repeat: '',
    finalDate: ''
    }
    this.form.patchValue(res)
    this.showNewEvent = false
  }

  setAgenda(){
    if(this.events.length > 0){
      this.events.forEach(event => {
        delete event._id
      })
      this.closeEventModal()
      this.loadingService.show()
      this.eventService.getMeetRoom().subscribe(res => {
        this.events.forEach(element => {
          element.meet = res
        })
  
        this.eventService.addEvent(this.events).subscribe(res => {
          this.loadingService.hide()
          location.reload()
        })
      })
    }else{
      this.loadingService.show()
      let dia = moment(this.form.value.start).format('DD')
      let mes = moment(this.form.value.start).format('MM')
      let ano = moment(this.form.value.start).format('YYYY')
      this.form.patchValue({dia, mes, ano})
      this.events.push(this.form.value)
      this.closeEventModal()
      this.eventService.getMeetRoom().subscribe(res => {
        this.events.forEach(event => {
          event.meet = res 
          delete event._id
        })
      })
      console.log(this.events)
      this.setAgenda()
    }
  }
}
