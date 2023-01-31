import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignOutService {

  public url: String = 'https://psimanager.herokuapp.com'

  constructor(private http: HttpClient) { }

  addNewUser(user: any): Observable<any> {
    return this.http.post(`${environment.api}/user`, user )
  }

  updateUser(user: any): Observable<any> {
    let userData = JSON.stringify(user)
    localStorage.setItem('userData', userData)
    console.log(userData)
    return this.http.put(`${environment.api}/user/update-user`, user)
  }
}
