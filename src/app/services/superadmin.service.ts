import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalData } from '../globaldata/global.data';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

// const headers = new HttpHeaders()
//   .set('content-type', 'application/json')
//   .set('Access-Control-Allow-Origin', '*');

var auth_token = sessionStorage.getItem('auth_token');

  const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`JWT ${auth_token}`);

    // const options = {
    //   headers: {
    //       'Content-Type': 'application/json',
    //       // 'Accept-Encoding': 'gzip, deflate, br',
    //       'Authorization': 'JWT '+auth_token
    //   }
    // }

    const options = {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + auth_token }
  }
  

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  constructor(private http: HttpClient) { }

  //  Login 

  Login(data:any): Observable<any>{
    return this.http.post<any>(GlobalData.url_account + 'token', data )
    .pipe(shareReplay(1));
  }

// userlist

  userlist(){
    return this.http.get<any>(GlobalData.url_api + 'accounts/api/users/list')
    .pipe(shareReplay(1));
  }

  // company registration

  companyregistration(data:any): Observable<any> {
    return this.http.post<any>(GlobalData.url_account + 'company/create/admin', data , options)
  }
  allcompanyregistrationdata(): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'company/list/admin' , options)
      .pipe(shareReplay(1));
  }
  deletecompanyregistrationdata(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_account + 'company/rud/' + id, options)
      .pipe(shareReplay(1));
  }
  updatecompanyregistrationdata(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_account + 'company/rud/' + id, data, options)
      .pipe(shareReplay(1));
  }

  // contact persons list

  contactperson(){
    return this.http.get<any>(GlobalData.url_account + 'user/superadmin' )
    .pipe(shareReplay(1));
  }

// types

  types(){
    return this.http.get<any>(GlobalData.url_api + 'type/list')
    .pipe(shareReplay(1));  
  }

  // license 

  Addlicense(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'license/create' , data , { 'headers': headers })
  } 
  alllicensedata(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'license', options)
      .pipe(shareReplay(1));
  }
  deletelicense(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'license/rd/' + id , { 'headers': headers })
      .pipe(shareReplay(1));
  }
  updatelicense(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'license/rd/'+id , data , { 'headers': headers })
      .pipe(shareReplay(1));
  }
  device_list(){
    return this.http.get<any>(GlobalData.url_api + 'device/list')
    .pipe(shareReplay(1));
  }


  // quality librarylist

  Addlibrarylist(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'quality/create', data, options)
  }
  alllibrarylist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'quality/list', options)
      .pipe(shareReplay(1));
  }
  deletelibrarylist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'quality/rud/' + id, options)
      .pipe(shareReplay(1));
  }
  updatelibrarylist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'quality/rud/' + id, data, options)
      .pipe(shareReplay(1));
  }

// checklist

  Addchecklist(data:any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'check/create',data, options)
  }
  allchecklist(id:any): Observable<any>{
    return this.http.get<any>(GlobalData.url_buildcron + 'quality/checklist/' + id, options)
  }
  deletechecklist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'check/rud/' + id , options)
      .pipe(shareReplay(1));
  }
  updatechecklist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'check/rud/' + id, data, options)
      .pipe(shareReplay(1));
  }
  // quality testlibrarylist

  Addtestlibrarylist(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'check/list_or_create', data)
  }
  alltestlibrarylist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'check/list_or_create')
      .pipe(shareReplay(1));
  }
  deletetestlibrarylist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'license/' + id)
      .pipe(shareReplay(1));
  }
  updatetestlibrarylist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'license/' + id, data)
      .pipe(shareReplay(1));
  }

  //  safetylibrarylist

  Addsaftylibrarylist(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'safety/create', data,options)
  }
  allsaftylibrarylist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'safety/list',options)
      .pipe(shareReplay(1));
  }
  deletesaftylibrarylist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'safety/rud/' + id,options)
      .pipe(shareReplay(1));
  }
  updatesaftylibrarylist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'safety/rud/' + id, data,options)
      .pipe(shareReplay(1));
  }

// safety checklist


allsaftychecklist(id:any): Observable<any> {
  return this.http.get<any>(GlobalData.url_buildcron + 'safety/checklist/' + id,options)
    .pipe(shareReplay(1));
}
deletesaftychecklist(id: any): Observable<any> {
  return this.http.delete<any>(GlobalData.url_buildcron + 'safety/checklist/' + id,options)
    .pipe(shareReplay(1));
}

  // safety testlibrarylist

  Addsafetytest(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'license/', data)
  }
  allsafetytest(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'license/')
      .pipe(shareReplay(1));
  }
  deletesafetytest(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'license/' + id, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  updatesafetytest(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'license/' + id, data, { 'headers': headers })
      .pipe(shareReplay(1));
  }

  // material

  Addmaterial(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'license/', data)
  }
  allmaterial(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'license/')
      .pipe(shareReplay(1));
  }
  deletematerial(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'license/' + id, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  updatematerial(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'license/' + id, data, { 'headers': headers })
      .pipe(shareReplay(1));
  }

  // Queries

  Addqueries(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'license/', data)
  }
  allqueries(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'license/')
      .pipe(shareReplay(1));
  }
  deletequerie(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'license/' + id, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  updatequerie(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'license/' + id, data, { 'headers': headers })
      .pipe(shareReplay(1));
  }

  // FAQs

  Addfaqs(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'faq/list_or_create', data,options)
  }
  allfaqs(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'faq/list_or_create',options)
      .pipe(shareReplay(1));
  }
  deletefaq(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'faq/rud/' + id,options)
      .pipe(shareReplay(1));
  }
  updatefaq(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'faq/rud/' + id, data,options)
      .pipe(shareReplay(1));
  }


  // banner

  Addbanner(data:any):Observable<any>{
    return this.http.post<any>(GlobalData.url_api + 'banner/list_or_create', data)
  }
  Listbanner():Observable<any>{
    return this.http.get<any>(GlobalData.url_api + 'banner/list_or_create')
    .pipe(shareReplay(1));
  }
  deletebanner(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'banner/rud/' + id)
      .pipe(shareReplay(1));
  }
  updatebanner(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'banner/rud/' + id, data)
      .pipe(shareReplay(1));
  }
}

