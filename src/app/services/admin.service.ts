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
export class AdminService {

  constructor(private http: HttpClient) { }

  // project

  AddProject(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'project/create', data, options)
  }
  Projectslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'project/list', options)
      .pipe(shareReplay(1));
  }
  DeleteProject(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'project/rd/' + id, options)
      .pipe(shareReplay(1));
  }
  UpdateProject(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'project/update/' + id, data, options)
      .pipe(shareReplay(1));
  }

  // Employess

  AddEmploye(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'emp/create', data, options)
  }
  Employeslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'emp' , options)
      .pipe(shareReplay(1));
  }
  DeleteEmploye(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'emp/rd/' + id, options)
      .pipe(shareReplay(1));
  }
  UpdateEmploye(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'emp/update/' + id, data, options)
      .pipe(shareReplay(1));
  }
  SingleEmployee(id:any):Observable<any>{
    return this.http.get<any>(GlobalData.url_buildcron + 'emp/rd/' + id, options)
    .pipe(shareReplay(1));
  }
  // Vendors

  Addvendor(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'register/', data)
  }
  vendorslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'register/')
      .pipe(shareReplay(1));
  }
  Deletevendor(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'register/' + id, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  Updatevendor(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'register/' + id, data, { 'headers': headers })
      .pipe(shareReplay(1));
  }

   // Material

  AddMaterial(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'register/', data)
  }
  Materialslist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'register/')
      .pipe(shareReplay(1));
  }
  DeleteMaterial(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'register/' + id, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  UpdateMaterial(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'register/' + id, data, { 'headers': headers })
      .pipe(shareReplay(1));
  }

  // QualityInspection

  AddQualityInspection(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'register/', data)
  }
  QualityInspectionlist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'register/')
      .pipe(shareReplay(1));
  }
  DeleteQualityInspection(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'register/' + id, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  UpdateQualityInspection(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'register/' + id, data, { 'headers': headers })
      .pipe(shareReplay(1));
  }

  // QualityTestingData

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

}
