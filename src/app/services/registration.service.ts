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
  return this.http.get<any>(GlobalData.url_api+'admin/client/plan');
}

singleplane(id:any):Observable<any>{
  return this.http.get<any>(GlobalData.url_api+'admin/client/plan?plan_id='+id);
}

Client_Registration(data:any):Observable<any>{
  return this.http.post<any>(GlobalData.url_account+'client/registration',data);
}

contacts(data:any):Observable<any>{
  return this.http.post<any>(GlobalData.url_account+'contact/create',data);
}

license(data:any,client_id:any):Observable<any>{
  return this.http.post<any>(GlobalData.url_account+'license/holder/licence?payment_status='+'True'+'&'+'client_id='+client_id,data);
}

}
