import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalData } from '../globaldata/global.data';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

var auth_token = sessionStorage.getItem('auth_token');

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

//   const options = {
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

  AddProject(client_id:any,data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_account + 'license/holder/license/project/create?client_id='+client_id,data)
  }
  Projectslist(client_id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'license/holder/license/project/create?client_id='+client_id)
      .pipe(shareReplay(1));
  }
  DeleteProject(project_id: any,client_id:any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_account + 'license/holder/license/project/create?project_id='+project_id+'&'+'client_id='+client_id)
      .pipe(shareReplay(1));
  }
  UpdateProject(client_id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_account + 'license/holder/license/project/create?client_id='+client_id, data)
      .pipe(shareReplay(1));
  }

  // Employess

  AddEmploye(data: any,client_id:any,license_id:any): Observable<any> {
    return this.http.post<any>(GlobalData.url_account + 'license/holder/license/assign?client_id='+client_id+'&'+'license_id='+license_id, data, this.options)
  }

  Assigneed_Project_Employee(data: any,client_id:any,employeeid:any,projectid:any):Observable<any>{
    return this.http.patch<any>(GlobalData.url_account + 'license/holder/license/assign?client_id='+client_id+"&employee_id="+employeeid+"&project_id="+projectid, data, this.options)
  }

  ClientLicenselist(client_id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'license/holder/license/create?client_id='+client_id)
      .pipe(shareReplay(1));
  }

  Employeslist(client_id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'license/holder/license/assign?client_id='+client_id)
      .pipe(shareReplay(1));
  }
  DeleteEmploye(clientid:any,id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_account + 'license/holder/license/assign?client_id='+clientid+'&employee_id='+ id)
      .pipe(shareReplay(1));
  }
  UpdateEmploye(employe_id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_account + 'license/holder/license/assign?employee_id='+ employe_id, data)
      .pipe(shareReplay(1));
  }
  SingleEmployee(id:any):Observable<any>{
    return this.http.get<any>(GlobalData.url_buildcron + 'emp/rud/' + id, this.options)
    .pipe(shareReplay(1));
  }
  // Vendors

  Addvendor(client_id:any,data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_account + 'license/holder/license/vendor?client_id='+client_id, data,this.options)
  }
  vendorslist(client_id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'license/holder/license/vendor?client_id='+client_id)
      .pipe(shareReplay(1));

  }
  //projcect assign vendor
  Assigneed_Project_Vendor(data: any,client_id:any,vendorid:any,projectid:any):Observable<any>{
    return this.http.patch<any>(GlobalData.url_account + 'license/holder/license/vendor?client_id='+client_id+"&vendor_id="+vendorid+"&project_id="+projectid, data, this.options)
  }

  Singlevendorlist(id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'vendor/rud/'+id,)
      .pipe(shareReplay(1));
  }
  Deletevendor(vendor_id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_account + 'license/holder/license/vendor?vendor_id='+vendor_id)
      .pipe(shareReplay(1));
  }
  Updatevendor(vendor_id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_account+ 'license/holder/license/vendor?vendor_id='+vendor_id, data)
      .pipe(shareReplay(1));
  }

   // Material

  AddMaterial(client_id:any,vendor_id:any,data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_account + 'license/holder/license/material?client_id='+client_id+'&'+'make='+vendor_id, data )
  }
  Materialslist(client_id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'license/holder/license/material?client_id='+client_id)
      .pipe(shareReplay(1));
  }
  //assing project material

  Assigneed_Project_Meterial(data: any,client_id:any,materialid:any,projectid:any):Observable<any>{
    return this.http.patch<any>(GlobalData.url_account + 'license/holder/license/material?client_id='+client_id+"&material_id="+materialid+"&project_id="+projectid, data, this.options)
  }
  DeleteMaterial(id: any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_account + 'material/rud/' + id)
      .pipe(shareReplay(1));
  }
  UpdateMaterial(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_account + 'material/rud/' + id, data)
      .pipe(shareReplay(1));
  }
  SingleMaterial(id: any,): Observable<any> {
    return this.http.get<any>(GlobalData.url_buildcron + 'material/rud/' + id, this.options)
      .pipe(shareReplay(1));
  }


  // QualityInspection

  alllibrarylist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'admin/checklist/quality')
      .pipe(shareReplay(1));
  }
  //PARTICULAR QUALITY CHECKLIST QUESTION
  libraryquestionlist(checklistid:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'admin/checklist/quality?question_qualityid='+checklistid)
      .pipe(shareReplay(1));
  }



  AddQualityInspection(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_account + 'license/holder/license/quality/checklist', data)
  }
  QualityInspectionlist(client_id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'license/holder/license/quality/checklist?client_id='+client_id)
      .pipe(shareReplay(1));
  }


  ShowQualityQuestionInspection(client:any,id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'license/holder/license/quality/checklist/question?client_id='+client+"&checklistid="+id)
  }
  AddQualityQuestionInspection(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_account + 'license/holder/license/quality/checklist/question', data)
  }

  DeleteQualityInspection(client_id:any,quality:any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_account + 'license/holder/license/quality/checklist?client_id='+client_id+"&qualitychecklist="+quality)
      .pipe(shareReplay(1));
  }
  UpdateQualityInspection(id: any, data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_buildcron + 'quality/checklist/assign/project/' + id, data, this.options)
      .pipe(shareReplay(1));
  }
  //ADD QUALITY CHECKLIST IN PROJECT
  AddQualityInspectionlist(data:any,client_id:any,qualityid:any,project:any): Observable<any> {
    return this.http.patch<any>(GlobalData.url_account + 'license/holder/license/quality/checklist?client_id='+client_id+"&clientqualitycheklist_id="+qualityid+"&project_id="+project,data)
      .pipe(shareReplay(1));
  }


  // Quality Safety Inspection

  allsaftylibrarylist(): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'admin/checklist/sefty')
      .pipe(shareReplay(1));
  }
  //PARTICULAR SEFTY CHECKLIST QUESTION

  saftylibraryQuestionlist(seftychecklistid:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_api + 'admin/checklist/sefty?question_seftyid='+seftychecklistid)
      // .pipe(shareReplay(1));
  }


  AddSafetyInspection(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_account + 'license/holder/license/sefty/checklist', data)
  }
  SafetyInspection(client_id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'license/holder/license/sefty/checklist?client_id='+client_id)
      .pipe(shareReplay(1));
  }

  //ADD SAFTY CHECKLIST IN PROJECT
  AddSaftyInspectionlist(data:any,client_id:any,qualityid:any,project:any): Observable<any> {
    return this.http.patch<any>(GlobalData.url_account + 'license/holder/license/sefty/checklist?client_id='+client_id+"&clientsaftycheklist_id="+qualityid+"&project_id="+project,data)
      .pipe(shareReplay(1));
  }
  DeleteSafetyInspection(client_id:any,id:any): Observable<any> {
    return this.http.delete<any>(GlobalData.url_account + 'license/holder/license/sefty/checklist?client_id='+client_id +"&seftychecklist="+id,)
      .pipe(shareReplay(1));
  }

  UpdateSafetyInspection(id: any, data: any): Observable<any> {
    return this.http.put<any>(GlobalData.url_api + 'register/' + id, data, { 'headers': headers })
      .pipe(shareReplay(1));
  }
  //ADD SAFTY QUESTION IN SAFTY CHECKLIST FOR CLIENT

  AddSafetyQuestionInspection(data: any): Observable<any> {
    return this.http.post<any>(GlobalData.url_account + 'license/holder/license/sefty/checklist/question', data)
  }

  ShowSaftyQuestionInspection(client:any,id:any): Observable<any> {
    return this.http.get<any>(GlobalData.url_account + 'license/holder/license/sefty/checklist/question?client_id='+client+"&checklistid="+id)
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

deletereports(delete_id:any): Observable<any>{
  return this.http.delete<any>(GlobalData.url_buildcron + 'report/delete/'+ delete_id,this.options)
  .pipe(shareReplay(1));
}

// change password

changepassword(data:any):Observable<any>{
  return this.http.put<any>(GlobalData.url_account+'password/'+`${this.getemail()}`+'/reset',data,this.options);
}


// banners


Addbanner(data:any):Observable<any>{
  return this.http.post<any>(GlobalData.url_buildcron + 'tenent/banner/create' , data,config)
}
Listbanner():Observable<any>{
  return this.http.get<any>(GlobalData.url_buildcron + 'tenent/banner/list',this.options)
  .pipe(shareReplay(1));
}
deletebanner(id: any): Observable<any> {
  return this.http.delete<any>(GlobalData.url_buildcron + 'tenent/banner/delete/' + id,this.options)
    .pipe(shareReplay(1));
}
updatebanner(id: any, data: any): Observable<any> {
  return this.http.put<any>(GlobalData.url_buildcron + 'tenent/banner/update/' + id, data, config)
    .pipe(shareReplay(1));
}

}
