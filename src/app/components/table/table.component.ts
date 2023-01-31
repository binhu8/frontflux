import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  dataSource!: any[]
  userData: any = {}
  constructor(
    private clienteService: ClienteService,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.userData = this.userDataService.getUserData()
    this.getClient()
  }

  getClient(){
    this.clienteService.getClientes(this.userData.crp).subscribe((res:any) => {
      res.forEach((element:any) => {
        if(!element.hasOwnProperty('perfilImage')){
          console.log('AQUI', res)
          element.perfilImage = {url: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
        }
        
      })
     
      this.dataSource = res
      console.log(this.dataSource)

    })
  }
}
