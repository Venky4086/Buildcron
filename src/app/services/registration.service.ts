import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalData } from '../globaldata/global.data';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }
  
  getemail() {
    return sessionStorage.getItem('adminemail');
  }


allplanes():Observable<any>{
  return this.http.get<any>(GlobalData.url_account+'plans');
}

singleplane(id:any):Observable<any>{
  return this.http.get<any>(GlobalData.url_account+'plans/read/'+id);
}

plane(data:any):Observable<any>{
  return this.http.post<any>(GlobalData.url_account+'payment/request',data);
}
contacts(data:any){
  return this.http.post<any>(GlobalData.url_account+'contact/create',data);
}
}
