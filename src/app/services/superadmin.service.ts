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
    return this.http.post<any>(GlobalData.url_account + 'client/registration', data )
  }
  allcompanyregistrationdata(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'admin/client/registration')
      .pipe(shareReplay(1));
  }
  deletecompanyregistrationdata(client_id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'admin/client/registration?client_id='+ client_id,)
      .pipe(shareReplay(1));
  }
  updatecompanyregistrationdata(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_account + 'company/rud/' + id, data)
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
    return this.http.post<any>(GlobalData.url_api + 'license/create' , data ,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
  }
  alllicensedata(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'admin/client/licence')
      .pipe(shareReplay(1));
  }
  singleicensedata(c_name:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'license/employee/'+ c_name,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
      .pipe(shareReplay(1));
  }
  deletelicense(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'license/rd/' + id ,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
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
    return this.http.post<any>(GlobalData.url_api + 'admin/checklist/quality', data)
  }
  alllibrarylist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'admin/checklist/quality',)
      .pipe(shareReplay(1));
  }
  deletelibrarylist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'admin/checklist/quality?quality_id=' + id,)
      .pipe(shareReplay(1));
  }
  updatelibrarylist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api+ 'admin/checklist/quality?quality_id=' + id, data,
    )
      .pipe(shareReplay(1));
  }

// checklist

  Addchecklist(data:any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'admin/checklist/quality/question',data)
  }

  //EXCEL UPLOAD QUALITY CHECKLIST
  ExcelUploadQualitylibrary(data:any):Observable<any>{
    return this.http.post<any>(GlobalData.url_api + 'admin/checklist/quality/excel',data)

  }
  allchecklist(id:any): Observable<any>{
    return this.http.get<any>(GlobalData.url_api + 'admin/checklist/quality?question_qualityid='+id)
  }
  deletechecklist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'admin/checklist/quality/question?question_id='+id)
      .pipe(shareReplay(1));
  }
  updatechecklist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'admin/checklist/quality/question?question_id='+id, data, this.options)
      .pipe(shareReplay(1));
  }
  // quality testlibrarylist

  Addtestlibrarylist(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'check/list_or_create', data)
  }

  ///QUALITYCHECKLIST QUESTION UPLOAD EXCEL
  ExcelQualitylibraryQuesiton(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_api + 'admin/checklist/quality/question/excel', data)
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
    return this.http.post<any>(GlobalData.url_api + 'admin/checklist/sefty',data)
  }
  //EXCEL SAFTY CHECKLIST UPLOAD
  ExcelUploadsaftylibrary(data:any):Observable<any>{
    return this.http.post<any>(GlobalData.url_api + 'admin/checklist/safty/excel',data)

  }
  allsaftylibrarylist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'admin/checklist/sefty')
      .pipe(shareReplay(1));
  }
  deletesaftylibrarylist(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_api + 'admin/checklist/sefty?safty_id=' + id)
      .pipe(shareReplay(1));
  }
  updatesaftylibrarylist(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'admin/checklist/sefty?safty_id=' + id, data)
      .pipe(shareReplay(1));
  }

// safety checklist question

allsaftychecklist(id:any): Observable<any> {
  return this.http.get<any>(GlobalData.url_api + 'admin/checklist/sefty?question_seftyid='+id)
    .pipe(shareReplay(1));
}
addsaftychecklist(data:any): Observable<any> {
  return this.http.post<any>(GlobalData.url_api + 'admin/checklist/sefty/question',data)
}

updatesaftycheckquestion(id:any,data:any): Observable<any> {
  return this.http.put<any>(GlobalData.url_api + 'admin/checklist/sefty/question?question_id=' + id,data)
}
//SAFTYCHECKLIST QUESTION UPLOAD EXCEL
ExcelsaftychecklistQuestion(data:any): Observable<any> {
  return this.http.post<any>(GlobalData.url_api + 'admin/checklist/safty/question/excel',data)
}


deletesaftychecklist(id: any): Observable<any> {
  return this.http.delete<any>(GlobalData.url_api + 'admin/checklist/sefty/question?question_id=' + id)
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
    return this.http.post<any>(GlobalData.url_buildcron + 'faq/list_or_create', data,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
  }
  allfaqs(): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'faq/list_or_create',
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
      .pipe(shareReplay(1));
  }
  deletefaq(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'faq/rud/' + id,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
      .pipe(shareReplay(1));
  }
  updatefaq(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'faq/rud/' + id, data,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
      .pipe(shareReplay(1));
  }


  // banner

  Addbanner(data:any):Observable<any>{
    return this.http.post<any>(GlobalData.url_buildcron + 'banner/create' , data,config)
  }
  Listbanner():Observable<any>{
    return this.http.get<any>(GlobalData.url_buildcron + 'banner/list',
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
    .pipe(shareReplay(1));
  }
  deletebanner(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_buildcron + 'banner/delete/' + id,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
      .pipe(shareReplay(1));
  }
  updatebanner(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_buildcron + 'banner/update/' + id, data, config)
      .pipe(shareReplay(1));
  }

// website contacts

  all_contacts(): Observable<any>{
    return this.http.get<any>(GlobalData.url_account + 'contact',
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
  )
    .pipe(shareReplay(1));
  }
  delete_contact(id:any): Observable<any>{
    return this.http.delete<any>(GlobalData.url_account + 'contact/delete/'+id,
    {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + this.getToken() }
    }
    )
    .pipe(shareReplay(1));
  }
}

