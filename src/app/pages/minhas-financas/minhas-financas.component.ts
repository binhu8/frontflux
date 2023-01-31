import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { elementClosest } from '@fullcalendar/angular';
import { LoadingService } from 'src/app/core/services/loading.service';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

@Component({
  selector: 'app-minhas-financas',
  templateUrl: './minhas-financas.component.html',
  styleUrls: ['./minhas-financas.component.scss']
})
export class MinhasFinancasComponent implements OnInit {

  public dataSourceTimeline: any[] = []
  public atualMonthPercent: number   = 0 
  public invoicingAtualMonthPercent: number  = 0
  public ivoicingBeforeMonth: number  = 0
  public atualMonth =  new Date().getMonth() + 1
  public month: any = new Date().getMonth() + 1
  public year: any = new Date().getFullYear()
  public atualYear: any = new Date().getFullYear()
  public dataSource: any = [];
  public total: number = 0
  public displayColumns: string[]= ['data', 'valor']
  public months: any = {
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
    private eventService: EventService, 
    private userDataService: UserDataService,
    private loadingService: LoadingService) { }
  @ViewChild('myChart', {static:true}) chart!: ElementRef 
  @ViewChild('chartYear', {static:true}) chartYear!: ElementRef 

  labelYear: any[] = []
  labels: any[] = []
 
  ngAfterViewInit(){
    
    
  }

  values: any[] = []
  ngOnInit(): void {
    this.getEventMonth()
    this.getEventYear()
   
  }

  getTotalCost() {
    return this.dataSource.map((t:any) => t.valorConsulta).reduce((acc:any, value:any) => acc + value, 0);
  }

  getBeforeMonth(){
    this.month -- <= 1 ? this.month = 12 : this.month 
    this.month == 12 ? this.year -- : false
    let chartStatus = Chart.getChart(this.chart.nativeElement)
    if(chartStatus != undefined){
      chartStatus.destroy()
    }
    this.getEventMonth()
    
  }
  getAfterMonth(){
    this.month ++ >= 12 ? this.month = 1 : this.month 
    this.month == 1 ? this.year ++ : false
    let chartStatus = Chart.getChart(this.chart.nativeElement)
    if(chartStatus != undefined){
      chartStatus.destroy()
    }
    this.getEventMonth()
  }

  getEventMonth(): void{
    this.total = 0
    this.labels = []
    this.values = []
    this.loadingService.show()
    let crp = this.userDataService.getUserCRP()
    this.eventService.getEvents(crp ).subscribe(res => {
      let response = res.filter((element: any) => element.mes == this.month && element.ano == this.year && element.pago);
      this.dataSourceTimeline = res.filter((element: any) => element.mes == this.month && element.ano == this.year);
      response.forEach((element: any) => {
        this.total += parseInt(element.valorConsulta)
      })
      this.dataSource = response
      this.dataSource.forEach((data: any, index: number) => {
        data.valorConsulta = Number(data.valorConsulta)
        this.verifyContainsDate(data)
        
      })

      this.getInvoicingBeforeMonth(res)

      new Chart(this.chart.nativeElement, {
        type: 'bar',
        options: {
          // responsive: false
        },
        data: {
          labels: this.labels,
          datasets: [{
          
            label: 'R$',
            data: this.values,
            backgroundColor: ['#1f3d51' ],
            borderWidth: 1,
            
          }]
        }
      })
      this.loadingService.hide()
    })
  }

  getEventYear(){
    this.loadingService.show()
    let crp = this.userDataService.getUserCRP()
    this.eventService.getEvents(crp).subscribe(res => {
      res.forEach((element: any) => {
        element.ano = Number(element.ano)
      })
      this.loadingService.hide()
    })

  }

  getInvoicingBeforeMonth(data: any){
    this.ivoicingBeforeMonth = 0
    this.invoicingAtualMonthPercent = 0
    data.forEach((element: any) => {
      element.mes = Number(element.mes)
      element.valorConsulta = Number(element.valorConsulta)
      if(element.mes == this.month -1 && element.pago) this.ivoicingBeforeMonth += element.valorConsulta
      if(element.mes == this.month && element.pago) this.invoicingAtualMonthPercent += element.valorConsulta
      if(this.ivoicingBeforeMonth <= 0){
        this.atualMonthPercent = 100
      }else{
        
        this.atualMonthPercent = (this.invoicingAtualMonthPercent - this.ivoicingBeforeMonth) / this.ivoicingBeforeMonth * 100 
        this.atualMonthPercent = Math.floor(this.atualMonthPercent)
      }
    })
  }

  verifyContainsDate(element: any){
    if(this.labels.includes(element.data)){
      let index = this.labels.indexOf(element.data)
      this.values[index] = this.values[index] + element.valorConsulta
    }else{
      this.labels.push(element.data)
      this.values.push(element.valorConsulta)
    }
  }

}
