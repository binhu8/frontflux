import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faHospitalUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment'
import { LoadingService } from 'src/app/core/services/loading.service';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-meus-clientes',
  templateUrl: './meus-clientes.component.html',
  styleUrls: ['./meus-clientes.component.scss']
})
export class MeusClientesComponent implements OnInit {

  loading = false
  periodo: number | null =  null
  crp: String = ''
  clipboardCopy: any = ''
  faCopy = faCopy
  cliente: any  = '';
  showPerfil: Boolean = false
  showModal: Boolean = false
  showCadastro: Boolean = false
  clientes: Cliente[] = []
  faHospitalUser = faHospitalUser;
  faMagnifingGlass = faMagnifyingGlass;
  valorPadrao: any = ''
  events: any[] = [ ]
  puloSemana: number = 0
  toggle = false

  selectRepeatOptions = [
    {value: 1, viewValue: 'Diariamente'},
    {value: 7, viewValue: 'Semanalmente'},
    {value: 14, viewValue: 'Quizenalmente'},
    {value: 30, viewValue: 'Mensalmente'},
  ]

  displayedColumns: string[] = ['nome', 'cpf', 'verPerfil'];
  dataSource: any = new MatTableDataSource(this.clientes);

  form: FormGroup = new FormGroup({
    // date: new FormControl('', Validators.required),
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

  constructor(
    private eventService: EventService, 
    private clienteService: ClienteService,
    private _adapter: DateAdapter<any>,
    private loadingService: LoadingService,
    @Inject ( MAT_DATE_LOCALE) private _locale: string
    ) { }

  ngOnInit(): void {
    let userData: any = localStorage.getItem('userData')
    let userObj = JSON.parse(userData)
    this.crp = userObj.crp
    this.form.patchValue({valorConsulta: userObj.valorConsultaPadrao}) 

    this.clienteService.getClientes(this.crp).subscribe(res => {
      this.clientes = res
      this.cliente = res[0]
      this.dataSource = res
    })

    this.clipboardCopy = `https://psimanager.netlify.app/cadastro-cliente/` + this.crp
    // this.clipboardCopy = `http://localhost:4200/cadastro-cliente/` + this.crp

    this.verificaNovosClientes()
    this.ptBr()
  }

  ptBr(){
    this._locale = 'pt-BR'
    this._adapter.setLocale(this._locale)
  }

  applyFilter(event: KeyboardEvent) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    if(event.code == "Backspace"){
      this.dataSource = this.clientes.filter((a: any) => a.nome.toLowerCase().indexOf(filterValue) >=0 )
    }else{
      this.dataSource = this.dataSource.filter((a: any) => a.nome.toLowerCase().indexOf(filterValue) >=0 )
    }

    console.log(this.dataSource)
  }

  verificaNovosClientes(){
    setInterval(()=>{
      this.clienteService.getClientes(this.crp).subscribe(res => {
        if(this.dataSource.length < res.length && this.clientes.length < res.length){
          this.dataSource = res
          this.clientes = res
        }
      })
    }, 1000)
  }

  agendarConsulta(cliente: any): void{
    this.showModal = true;
    this.cliente = cliente
  }

  verPerfil(cliente: any){
    this.cliente = cliente;
    this.showPerfil=true
  }
  setAgenda(){
  
    this.loadingService.show()
    this.showModal = false

    
  
      if(this.events.length < 1) {
        this.events.push(this.form.value)
        this.setDateforEvents()
      }else{
        this.setDateforEvents()
      }
   
    this.eventService.getMeetRoom().subscribe(res => {
      this.events.forEach(element => {
        element.meet = res
      })

      this.eventService.addEvent(this.events).subscribe(res => {
        location.reload()
      })
    });

    
  }


  setDateforEvents(){

   

    this.events.forEach(element => {

      let userData: any = localStorage.getItem('userData')
      let userObj = JSON.parse(userData)
      this.crp = userObj.crp
      element.crp = this.crp

      let ano:any  = element.start.getFullYear();
      let mes:any  = element.start.getMonth() + 1;
      let dia:any  = element.start.getDate() ;
      
      element.data = `${dia}/${mes}/${ano}`
      element.mes = mes
      element.ano = ano
      element.dia = dia
      element.realizado = false
      element.cpfCliente = this.cliente.cpf;
      element.color = this.generateColor();
      element.start = moment(element.start).format(`YYYY-MM-DD[T]${element.time}`)
     })
  }

  generateColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
    
  }

  deleteCliente(cliente: Cliente){
    this.clienteService.deleteCliente(cliente).subscribe(res => {
      this.dataSource = res;
      this.clientes= res
    });

    this.eventService.event$.subscribe(res => {
      window.location.reload()
      console.log('response de evento', res)
    })
  }

  setFinalDate(){
    let form = this.form.value
    this.events = []
    let currentDate: any = this.form.value.start
    let startDate:any = new Date(this.form.value.start)
    let endDate:any = new Date(this.form.value.finalDate) 
    let msDays = endDate - startDate
    let periodo = this.form.value.repeat
    let condition: Number = Math.floor( msDays / (1000 * 60 * 60 * 24 ) / periodo + 1)
    console.log(condition)
    
    for(let i =0; i< condition; i++){
      
      let date = new Date(currentDate)
      this.form.patchValue({start: currentDate})
      this.events.push(this.form.value)
      let newDate: any = date.setDate(date.getDate()+periodo)
       newDate = new Date(newDate)
       currentDate = newDate
       console.log(this.events)
      }

      this.form.patchValue({start: this.events[0].start})
  }

    togglebutton(event: any){
      this.toggle = event
    }
}
