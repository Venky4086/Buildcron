import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { GlobalData } from '../globaldata/global.data';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationserviceService {

  constructor(private http:HttpClient) { }

 // cleint login

    ClientLogin(data:any): Observable<any>{
      return this.http.post<any>(GlobalData.url_account + 'client/login', data )
      .pipe(shareReplay(1));
    }


  getToken() {
    if(typeof sessionStorage.getItem('auth_token') != 'undefined' && sessionStorage.getItem('auth_token') != '' && sessionStorage.getItem('auth_token') != null) {
      return sessionStorage.getItem('auth_token');
    } else {
      return '';
    }
  }
}
