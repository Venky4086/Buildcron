import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalData } from '../globaldata/global.data';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

// var auth_token = sessionStorage.getItem('auth_token');

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

//   const options = {
//     headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + auth_token }
// }

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
    
   }
   getemail() {
    return sessionStorage.getItem('adminemail');
  }
   getToken() {
    return sessionStorage.getItem('auth_token');
  }

   options = {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
  }
 

  // project

  AddProject(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'project/create', data, this.options)
  }
  Projectslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'project/list', this.options)
      .pipe(shareReplay(1));
  }
  DeleteProject(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'project/rd/' + id, this.options)
      .pipe(shareReplay(1));
  }
  UpdateProject(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'project/update/' + id, data, this.options)
      .pipe(shareReplay(1));
  }

  // Employess

  AddEmploye(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'emp/list_or_create', data, this.options)
  }
  Employeslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'emp/list_or_create' , this.options)
      .pipe(shareReplay(1));
  }
  DeleteEmploye(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'emp/rud/' + id, this.options)
      .pipe(shareReplay(1));
  }
  UpdateEmploye(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'emp/rud/' + id, data, this.options)
      .pipe(shareReplay(1));
  }
  SingleEmployee(id:any):Observable<any>{
    return this.http.get<any>(GlobalData.url_buildcron + 'emp/rud/' + id, this.options)
    .pipe(shareReplay(1));
  }
  // Vendors

  Addvendor(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'vendor/list_or_create', data,this.options)
  }
  vendorslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'vendor/list_or_create',this.options)
      .pipe(shareReplay(1));
  }
  Singlevendorlist(id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'vendor/rud/'+id,this.options)
      .pipe(shareReplay(1));
  }
  Deletevendor(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'vendor/rud/' + id, this.options)
      .pipe(shareReplay(1));
  }
  Updatevendor(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'vendor/rud/' + id, data , this.options)
      .pipe(shareReplay(1));
  }

   // Material

  AddMaterial(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'material/create', data , this.options)
  }
  Materialslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'material/list', this.options)
      .pipe(shareReplay(1));
  }
  DeleteMaterial(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'material/rud/' + id, this.options)
      .pipe(shareReplay(1));
  }
  UpdateMaterial(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'material/rud/' + id, data, this.options)
      .pipe(shareReplay(1));
  }
  SingleMaterial(id: any,): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'material/rud/' + id, this.options)
      .pipe(shareReplay(1));
  }


  // QualityInspection

  AddQualityInspection(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'quality/checklist/assign/project', data,this.options)
  }
  QualityInspectionlist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'quality/project',this.options)
      .pipe(shareReplay(1));
  }
  DeleteQualityInspection(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'register/' + id, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  UpdateQualityInspection(id: any, data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'quality/checklist/assign/project/' + id, data, this.options)
      .pipe(shareReplay(1));
  }

  // Quality Safety Inspection

  AddSafetyInspection(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'safety/checklist/assign/project', data,this.options)
  }
  SafetyInspection(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'safety/project',this.options)
      .pipe(shareReplay(1));
  }
  DeleteSafetyInspection(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'register/' + id, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  UpdateSafetyInspection(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'register/' + id, data, { 'headers': headers })
      .pipe(shareReplay(1));
  }
   
// testdata

  AddQualityTestingData(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'register/', data)
  }
  QualityTestingDatalist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'register/')
      .pipe(shareReplay(1));
  }
  DeleteQualityTestingData(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'register/' + id, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  UpdateQualityTestingData(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'register/' + id, data, { 'headers': headers })
      .pipe(shareReplay(1));
  }

// reports

allreports(): Observable<any> {
  return this.http.get<any>(GlobalData.url_buildcron + 'report',this.options)
    .pipe(shareReplay(1));
}

// change password

changepassword(data:any):Observable<any>{
  return this.http.put<any>(GlobalData.url_account+'password/'+`${this.getemail()}`+'/reset',data,this.options);
}
}
