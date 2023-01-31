import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-financas',
  templateUrl: './timeline-financas.component.html',
  styleUrls: ['./timeline-financas.component.scss']
})
export class TimelineFinancasComponent implements OnInit {

  @Input() dataSource: any[] = []
  constructor() { }

  ngOnChanges(){
    this.dataSource.forEach(item => {
      console.log(item)
    })
  }
  ngOnInit(): void {
  }

}
