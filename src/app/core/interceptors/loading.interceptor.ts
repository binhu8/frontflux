import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  public activeRequests: number = 0
  constructor( private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if(this.activeRequests === 0){
    //   this.loadingService.show()
    //   console.log('passei por aqui também')
    // }
    // this.activeRequests ++
    // finalize(()=> {
    //   this.loadingService.hide()
    // })
    // )
    return next.handle(request)
  }
}


