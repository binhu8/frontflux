import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/user-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public url: string = 'https://psimanager.herokuapp.com/'

  constructor(private http: HttpClient) { }

  getUserCRP(): String {
    let userData: any = localStorage.getItem('userData')
    let userObj = JSON.parse(userData)
    let crp = userObj.crp
    return crp
  }

  getUserData(): UserData {
    let userData: any = localStorage.getItem('userData')
    let userObj = JSON.parse(userData)
    let response = userObj
    return response
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${environment.api}/user/update-user`, user)
  }

  gerUserByCrp(params: Params){
    
    return this.http.get(`${environment.api}/getUser/${params}`, )
  }

  uploadImg(img: FormData){
   
    return this.http.post(`http://localhost:3003/teste`, img)
  }
  getPerfilImage(id: string){
    return this.http.get(`${environment.api}/teste/getImage/${id}`)
  }
}
