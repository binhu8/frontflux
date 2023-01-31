import { Component, ElementRef, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import {PIX} from 'gpix/dist'
import { PixService } from 'src/app/services/pix/pix.service';

@Component({
  selector: 'app-cobrancas',
  templateUrl: './cobrancas.component.html',
  styleUrls: ['./cobrancas.component.scss']
})
export class CobrancasComponent implements OnInit {

  @Input() dataSource: any[] = []
  @Input() cliente: any = {};

  @ViewChild('pdf') el!: ElementRef

  imgData: string = ''
  userData: any = ''
  valoresEmAberto: boolean = false
  totalEvents: Number = 0
  events: any = []
  constructor(
    private userDataSerivce: UserDataService,
    private pixService: PixService) { }

  ngOnChanges(changes:any){
    if(changes.dataSource && this.totalEvents == 0){
      this.events = this.dataSource
      this.calculaTotalEvents()
    }
  }
  ngOnInit(): void {
    this.calculaTotalEvents()
    this.getUserData();
    this.gerarQrCode()
  }

  
  calculaTotalEvents(){
    this.events.forEach((event:any) => {
     let valorConsulta: any = Number(event.valorConsulta)
    if(!event.pago){
      this.valoresEmAberto = true
    }
      this.totalEvents += valorConsulta
    })
  }
  

  getUserData(){
    this.userData = this.userDataSerivce.getUserData()
    console.log(this.userData, 'user data')
  }
  
  printPDF(){    
    console.log(this.el, 'element')

     html2canvas(this.el.nativeElement).then(canvas => {
       let pdf = new jsPDF('p')
      
       let imgData = canvas.toDataURL('image/png')

       const imgProps= pdf.getImageProperties(imgData);
       const pdfWidth = pdf.internal.pageSize.getWidth();
       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
       pdf.text('teste', 10, 10)

      //  pdf.addImage(imgData, 'PNG', 0,0, pdfWidth, pdfHeight)
       pdf.save(`${this.cliente.nome}.pdf`);
       
     })
  }

  gerarQrCode(){
    console.log('funcion gerar pix execultada')
    this.pixService.getQrCode(this.userData, this.totalEvents).subscribe((res: any) => {
      this.imgData = res.img
    })
  }

}
