
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { EventService } from 'src/app/services/event/event.service';
import { PixService } from 'src/app/services/pix/pix.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-realatorio-cliente',
  templateUrl: './realatorio-cliente.component.html',
  styleUrls: ['./realatorio-cliente.component.scss']
})
export class RealatorioClienteComponent implements OnInit {

  @ViewChild('pdf') el!: ElementRef

  id: string | null = null
  message: string = 'Copiar código'
  crp: any  = ''
  subtotal: number = 0
  descontos: number = 0
  totalEvents: number = 0
  events: any[] = []
  cliente: any = {}
  month: string | null = ''
  year: string | null = ''
  atualDay = new Date().getDate()
  atualMonth = new Date().getMonth() + 1 
  atualYear  = new Date().getFullYear() 
  userData: any = {}
  pix = {
    imgData: '',
    brCode: ''
  }
  months: any = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro'
   }


  constructor(
    private clientService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private pixService: PixService,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('mes')) this.month = this.activatedRoute.snapshot.paramMap.get('mes')
    if(this.activatedRoute.snapshot.paramMap.get('ano')) this.year = this.activatedRoute.snapshot.paramMap.get('ano')
    this.crp = this.activatedRoute.snapshot.paramMap.get('crp')
    if(this.activatedRoute.snapshot.paramMap.get('id')) this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.getUserData()

  }


  getClientData(id: any){
    this.clientService.getClientById(id).subscribe(res => {
      this.cliente = res
      console.log(this.cliente, 'cliente')
      this.getEvents(this.cliente.cpf, this.userData.crp)
    })
  }

  getUserData(){
    this.userDataService.gerUserByCrp(this.crp).subscribe((res:any) => {
      this.userData = res
      this.getClientData(this.id)
    })
  }


  getEvents(cpf: any, crp: string){
    this.eventService.getEventsClientByCpf(cpf, crp ).subscribe(res => {
      console.log(res)
      res = res.filter((it: any) => it.mes == this.month && it.ano == this.year )
      this.events = res

      if(this.userData) this.calculaTotal()
    })
  }

 
  calculaTotal(){
    this.events.forEach(event => {
      event.valorConsulta = Number(event.valorConsulta)
      this.subtotal += event.valorConsulta
      if(event.pago){
        this.descontos += event.valorConsulta
      }
    });
    this.totalEvents = this.subtotal - this.descontos
    this.getPix()
  }

  getPix(){
    console.log(this.userData)
    this.pixService.getQrCode(this.userData, this.totalEvents).subscribe((res: any) => {
      this.pix.brCode = res.code
      this.pix.imgData = res.img
    })
  }

  updateMessage(){
    this.message =  'Copiado'

    setTimeout(() => {
      this.message = 'Copiar código'
    }, 1000);
  }

  printPage(){
    this.el.nativeElement.print()
  }

  printPDF(){
    this.el.nativeElement.style.width = '21cm'
    this.el.nativeElement.style.height = '29.7cm'

    setTimeout(() => {
      this.el.nativeElement.style.width = ''
      this.el.nativeElement.style.height = ''
    }, 1000);

     html2canvas(this.el.nativeElement).then(canvas => {
       let pdf = new jsPDF()
      
       let imgData = canvas.toDataURL('image/png')

       const imgProps= pdf.getImageProperties(imgData);
       const pdfWidth = pdf.internal.pageSize.getWidth();
       console.log('width -> ', pdfWidth)
       console.log('heigth img -> ',imgProps.height)
       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
       console.log('heigth pdf -> ', pdfHeight)
       

       pdf.addImage(imgData, 'PNG', 0,0, pdfWidth, pdfHeight)
       pdf.save(`${this.cliente.nome}.pdf`);
       
     })
  }
}


