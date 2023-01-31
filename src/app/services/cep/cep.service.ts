import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  getCep(cep: any): Observable<Endereco> {
     return this.http.get<Endereco>(`//viacep.com.br/ws/${cep}/json`)
  }
}
