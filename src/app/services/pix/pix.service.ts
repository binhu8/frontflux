import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PixService {

  constructor(private http: HttpClient) { }

  getQrCode(userData: any, valor: any){
    console.log('passei aqui')
    return this.http.post(`${environment.api}/pix/`, {userData: userData, valor: valor})
  }
}
