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

    // const this.options = {
    //   headers: {
    //       'Content-Type': 'application/json',
    //       // 'Accept-Encoding': 'gzip, deflate, br',
    //       'Authorization': 'JWT '+auth_token
    //   }
    // }

  //   const this.options = {
  //     headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + auth_token }
  // }

  const config = {
    headers:{
      // 'content-type': 'multipart/form-data', 
    'Authorization': 'JWT ' + auth_token }
  };
  

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  constructor(private http: HttpClient) { }

  getToken() {
    return sessionStorage.getItem('auth_token');
  }

   options = {
    headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
  }

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
    return this.http.post<any>(GlobalData.url_account + 'company/create/admin', data , this.options)
  }
  allcompanyregistrationdata(): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'company/list/admin' , this.options)
      .pipe(shareReplay(1));
  }
  deletecompanyregistrationdata(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_account + 'company/rud/' + id, this.options)
      .pipe(shareReplay(1));
  }
  updatecompanyregistrationdata(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_account + 'company/rud/' + id, data, this.options)
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
    return this.http.get<any>(GlobalData.url_buildcron + 'license', this.options)
      .pipe(shareReplay(1));
  }
  singleicensedata(c_name:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'license/employee/'+ c_name, this.options)
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
    return this.http.post<any>(GlobalData.url_buildcron + 'quality/check/create', data, this.options)
  }
  alllibrarylist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'quality/check/list', this.options)
      .pipe(shareReplay(1));
  }
  deletelibrarylist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'quality/check/rd/' + id, this.options)
      .pipe(shareReplay(1));
  }
  updatelibrarylist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'quality/check/update/' + id, data, this.options)
      .pipe(shareReplay(1));
  }

// checklist

  Addchecklist(data:any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'question/create',data, this.options)
  }
  allchecklist(id:any): Observable<any>{
    return this.http.get<any>(GlobalData.url_buildcron + 'quality/check/rd/' + id, this.options)
  }
  deletechecklist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'question/rud/' + id , this.options)
      .pipe(shareReplay(1));
  }
  updatechecklist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'question/rud/' + id, data, this.options)
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
    return this.http.post<any>(GlobalData.url_buildcron + 'safety/check/create',data,this.options)
  }
  allsaftylibrarylist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'safety/check/list',this.options)
      .pipe(shareReplay(1));
  }
  deletesaftylibrarylist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'safety/check/rd/' + id,this.options)
      .pipe(shareReplay(1));
  }
  updatesaftylibrarylist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'safety/check/update/' + id, data,this.options)
      .pipe(shareReplay(1));
  }

// safety checklist

allsaftychecklist(id:any): Observable<any> {
  return this.http.get<any>(GlobalData.url_buildcron + 'safety/check/rd/' + id,this.options)
    .pipe(shareReplay(1));
}
deletesaftychecklist(id: any): Observable<any> {
  return this.http.delete<any>(GlobalData.url_buildcron + 'question/rud/' + id,this.options)
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
    return this.http.post<any>(GlobalData.url_buildcron + 'faq/list_or_create', data,this.options)
  }
  allfaqs(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'faq/list_or_create',this.options)
      .pipe(shareReplay(1));
  }
  deletefaq(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'faq/rud/' + id,this.options)
      .pipe(shareReplay(1));
  }
  updatefaq(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'faq/rud/' + id, data,this.options)
      .pipe(shareReplay(1));
  }


  // banner

  Addbanner(data:any):Observable<any>{
    return this.http.post<any>(GlobalData.url_buildcron + 'banner/list_or_create' , data,config)
  }
  Listbanner():Observable<any>{
    return this.http.get<any>(GlobalData.url_buildcron + 'banner/list_or_create',this.options)
    .pipe(shareReplay(1));
  }
  deletebanner(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'banner/rud/' + id,this.options)
      .pipe(shareReplay(1));
  }
  updatebanner(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'banner/rud/' + id, data, config)
      .pipe(shareReplay(1));
  }

// website contacts

  all_contacts(): Observable<any>{
    return this.http.get<any>(GlobalData.url_account + 'contact',this.options)
    .pipe(shareReplay(1));
  }
  delete_contact(id:any): Observable<any>{
    return this.http.delete<any>(GlobalData.url_account + 'contact/delete/'+id,this.options)
    .pipe(shareReplay(1));
  }
}

