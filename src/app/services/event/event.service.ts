import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { environment } from 'src/environments/environment';
import { UserDataService } from '../user-data/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public url = "https://psimanager.herokuapp.com";
  private eventSubject = new BehaviorSubject<any>('');
  public event$: Observable<any> = this.eventSubject.asObservable()

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor( private userDataService: UserDataService, private http: HttpClient, private loadingService: LoadingService) { }

  addEvent(event:any): Observable<any>{
    return this.http.post(`${environment.api}/add`, event,)
  }

  getEvents(crp: any): Observable<any> {
    return this.http.get(`${environment.api}/events/get/?crp=${crp}`)
  }
  getEventsClient(cpf: any): Observable<any> {
    console.log('get cliente eventos', cpf)
    let crp = this.userDataService.getUserCRP()
    return this.http.get(`${environment.api}/events/get-evento-cliente/?cpf=${cpf}&&crp=${crp}`)
  }
  getEventsClientByCpf(cpf: any, crp: string): Observable<any> {
    return this.http.get(`${environment.api}/events/get-evento-cliente/?cpf=${cpf}&&crp=${crp}`)
  }

  updateEvent(event: any):Observable<any>{
    console.log(event, 'toma toma')
    return this.http.post(`${environment.api}/update/update-event`,event)
  }

  getMeetRoom():Observable<any>{
    return this.http.get(`https://psi-stream.herokuapp.com/`, {responseType: 'text'})
  }

  deletEvent(id: string){
    return this.http.delete(`${environment.api}/events/delete/${id}`)
  }

  setEventDataUpdated(data: any){
    this.eventSubject.next(data)
  }
}
