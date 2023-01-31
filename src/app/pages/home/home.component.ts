import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventResponse } from 'src/app/models/event';
import { UserData } from 'src/app/models/user-data';
import { EventService } from 'src/app/services/event/event.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import * as moment from 'moment-timezone'
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MenuItemToolbar } from 'src/app/models/menu-item-toolbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedUser!: UserData
  events: EventResponse[] = []
  dataSource: EventResponse[] = []
  atualDay: number = new Date().getDate()
  atualMonth: number = new Date().getMonth() + 1 
  atualYear: number = new Date().getFullYear()


  itemsMenu: MenuItemToolbar[] = [
    {viewValue: 'Pacientes', value: '/'},
    {viewValue: 'Faturamento', value: '/minhas-financas'},
    {viewValue: 'Historico', value: '/configuracoes'}
  ]

  nameMonth:any = {
    1: 'Jan',
    2: 'Fev',
    3: 'Mar',
    4: 'Abr',
    5: 'Mai',
    6: 'Jun',
    7: 'Jul',
    8: 'Ago',
    9: 'Set',
    10: 'Out',
    11: 'Nov',
    12: 'Dec'
  }

  form: FormGroup = new FormGroup({
    foto: new FormControl('')
  })
  constructor(
    private eventService: EventService,
    private userDataService: UserDataService,
    private clientSerivce: ClienteService,
    private loadingSerice: LoadingService
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.userDataService.getUserData()
    this.eventService.getEvents(this.loggedUser.crp).subscribe(res => {
      this.events = res
      this.setEventsToday()
    })
  }



  setEventsToday(){
    this.dataSource = this.events.filter((event: EventResponse)=> {
       return Number(event.dia) == this.atualDay 
      && Number(event.mes) == this.atualMonth 
      && Number(event.ano) == this.atualYear
    })
    
    this.dataSource.forEach(event => {

      this.clientSerivce.getClientByCPF(event.cpfCliente, event.crp).subscribe(  (res: any) => {
        if(!res.hasOwnProperty('perfilImage')){
          console.log('aqui, 1',event)
          res.perfilImage = {url: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
        }
        let time = event.start.split('Z')
        event.time = moment(time[0]).format('HH:mm')
        console.log(time)
        event.perfilImage =  res.perfilImage
      })
    })
  }

  enterMeet(link: string){
    console.log(link)
    location.assign(link)
  }

  deleteEvent(id: any){
    this.eventService.deletEvent(id).subscribe(res => {
      window.location.reload()
    })
  }
}
