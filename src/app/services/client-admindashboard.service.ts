import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalData } from '../globaldata/global.data';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

var auth_token = sessionStorage.getItem('auth_token');

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  const options = {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + auth_token }
}

@Injectable({
  providedIn: 'root'
})
export class ClientAdmindashboardService {

  constructor(private http: HttpClient) { }

  Projectslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_dashbaord + 'project/analysis', options)
      .pipe(shareReplay(1));
  }
}
