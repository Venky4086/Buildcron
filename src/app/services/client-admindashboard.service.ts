import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalData } from '../globaldata/global.data';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

// var auth_token = sessionStorage.getItem('auth_token');

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class ClientAdmindashboardService {

  constructor(private http: HttpClient) { }
 
  gettoken(){
    return sessionStorage.getItem('auth_token')
 }

 options = {
   headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.gettoken() }
}

  Projectslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_dashbaord + 'project/analysis', this.options)
      .pipe(shareReplay(1));
  }
  SingleProjectslist(project_id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_dashbaord + 'project/analysis/read/'+project_id, this.options)
      .pipe(shareReplay(1));
  }
}
