import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  @Input('title') set _title(value: AbstractControl | null | undefined){
    if(value) this.title = value as FormControl
  }
  @Input('crp') set _crp(value: AbstractControl | null | undefined){
    if(value) this.crp = value as FormControl
  }
  @Input('cpfCliente') set _cpfCliente(value: AbstractControl | null | undefined){
    if(value) this.cpfCliente = value as FormControl
  }
  @Input('valorConsulta') set _valorConsulta(value: AbstractControl | null | undefined){
    if(value) this.valorConsulta = value as FormControl
  }

  title: FormControl = new FormControl('')
  crp: FormControl = new FormControl('')
  cpfCliente: FormControl = new FormControl('')
  valorConsulta: FormControl = new FormControl('')

  userData: any = {}
  searchContent: string = ''
  optionsFilter: any[] =[]
  clientes: any[] = []
  constructor(
    private clienteService: ClienteService,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.userData = this.userDataService.getUserData()
    this.crp.setValue(this.userData.crp)
    this.valorConsulta.setValue(this.userData.valorConsultaPadrao)
    this.clienteService.getClientes(this.userData.crp).subscribe(res => {
      this.clientes = res
      this.optionsFilter = this.clientes
    })
  }

  filter(){
    this.optionsFilter = this.clientes.filter(it => {
      return it.nome.toUpperCase().includes(this.searchContent.toUpperCase())
    })
  }

  setValue(element: any){
    this.title.setValue(element.nome)
    this.cpfCliente.setValue(element.cpf)
    this.searchContent = ''
  }

}
