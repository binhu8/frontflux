import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from 'src/app/models/cliente';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url: String = 'https://psimanager.herokuapp.com'
  constructor(private http: HttpClient) { }

  addCliente(cliente: Cliente): Observable<any> {
      return this.http.post(`${environment.api}/add-cliente`, cliente)
  }

  getClientes(crp:String): Observable<any> {
    return this.http.get(`${environment.api}/clientes/?crp=${crp}`)
  }

  getClientById(id: string){
    return this.http.get(`${environment.api}/clientes/${id}`)
  }
  getClientByCPF(cpf: string, crp: string){
    return this.http.get(`${environment.api}/clientes/cpf/${cpf}/${crp}`)
  }

  updateCliente(cliente: any): Observable<any> {
    return this.http.put<any>(`${environment.api}/cliente/update`, cliente)
  }

  deleteCliente(cliente: Params): Observable<any> {
    return this.http.delete<any>(`${environment.api}/delete/cliente`, {params: cliente})
  }
}
