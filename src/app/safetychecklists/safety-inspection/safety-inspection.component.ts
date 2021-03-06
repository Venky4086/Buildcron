import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { SuperadminService } from 'src/app/services/superadmin.service';
import { from } from 'rxjs';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { ConditionalExpr } from '@angular/compiler';
declare var $:any;
@Component({
  selector: 'app-safety-inspection',
  templateUrl: './safety-inspection.component.html',
  styleUrls: ['./safety-inspection.component.css']
})
export class SafetyInspectionComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  quality_id: any;
  Qualitylist: any;
  projectlist: any;
  selectedItems:any[] = [];
  dropdownSettings:IDropdownSettings = {};
  dropdownList:any[]=[];
  librarylists: any;
  cheklistList: any[] =[];
  project_id: any;
  checklists: any;
  noquestions = false;
  questiondata = false;
  project: any;
  totalRecords:any;
  page:any=1;
  count:any = 5;
  client_id: any;
  sefty_check_list=new Set();
  previewquestionlist:any[]=[];
  saftyID:any;
  //
  saftychecklistid:any;
  Project =new Set();
  saftychecklistquestion=new Set();
  selected_safty_checklist:any;
  questionlist:any[]=[];
  constructor(private superadminserivce:SuperadminService,private adminservice: AdminService, private modalService: NgbModal, private fb: FormBuilder, private spinner: NgxSpinnerService, private toaster: ToastrService) { }

  AddQualityInspection = this.fb.group({
    // date:['', Validators.required],
    name: ['', Validators.required],
    // description:['', Validators.required],
    // id:['', Validators.required],
    // uploaded:['', Validators.required],
    project_assigned: ['', Validators.required],
  });
  UpdateQualityInspection = this.fb.group({
    // date:['', Validators.required],
    name: ['', Validators.required],
    // description:['', Validators.required],
    // id:['', Validators.required],
    // uploaded: ['', Validators.required],
    project_assigned: ['', Validators.required],
  });
  ngOnInit(): void {
    this.QualityInspectionlist();
    this.allprojects();
    this.alllibrarylist();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }
  get f() {
    return this.AddQualityInspection.controls
  }
  get u() {
    return this.UpdateQualityInspection.controls
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

// all projects

  allprojects(){
    this.client_id = sessionStorage.getItem('client_id')
    // this.spinner.show();
    this.adminservice.Projectslist(this.client_id).subscribe((res)=>{
      if(res){
        console.log(res);
        this.projectlist = res;
        // this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error);
      // this.spinner.hide();
    })
  }

  // all librarylist

  alllibrarylist(){
    // this.spinner.show();
    let tmp:any[] = [];
    this.adminservice.allsaftylibrarylist().subscribe((res)=>{
      if(res){
        console.log(res);
        this.librarylists = res;
        for(let i=0; i < this.librarylists.length; i++) {
          tmp.push({ item_id: this.librarylists[i].saftychecklistid, item_text: this.librarylists[i].name });
        }
        this.dropdownList = tmp;
        // this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.log(error);
      this.spinner.hide();
    })
  }

  // QualityInspection list

  QualityInspectionlist() {
    this.spinner.show();
    this.adminservice.SafetyInspection(sessionStorage.getItem('client_id')).subscribe((res) => {
      if (res) {
        console.log(res);
        this.Qualitylist = res;
        this.totalRecords = res.length;
        this.spinner.hide();
      }
      else {
        console.warn(res);
      }
    }, (error) => {
      console.error(error);
      this.spinner.hide();
    })
  }

  // Add

  Add() {

      const data =
        {
          // "project":this.project,
          "seftychecklist":Array.from(this.sefty_check_list).join(","),
          "client_id":sessionStorage.getItem('client_id'),
        }

      console.log(data);
      this.adminservice.AddSafetyInspection(data).subscribe((res) => {
        console.log(res);
        this.toaster.success('Sucessfully Add Inspection Done!');
        this.QualityInspectionlist();
        this.alllibrarylist();

      }, (error) => {
        console.error(error);
        this.toaster.error('Somthing went wrong!');

      })
    }


  // Update

  edit(project_id:any,project_name:any){
    this.project_id = project_id
    project_name = project_name
   }

  Update() {
    this.updatesubmitted = true;
    if (this.UpdateQualityInspection.invalid) {
      return
    }
    else {
      let arr1:any[] = []
      // console.log(this.selectedItems);
      for(let i=0; i < this.selectedItems.length; i++) {
        arr1.push(this.selectedItems[i].item_id);
      }
      this.cheklistList = arr1;
        const mint = this
        const data =
          {
            "project":this.UpdateQualityInspection.value.project_assigned,
            "safety":this.cheklistList
          }
      // const formData = new FormData;
      // formData.append('date', this.UpdateQualityInspection.value.date);
      // formData.append('name', this.UpdateQualityInspection.value.name);
      // formData.append('description', this.UpdateQualityInspection.value.description);
      // formData.append('uploaded', this.UpdateQualityInspection.value.uploaded);
      // formData.append('project_assigned', this.UpdateQualityInspection.value.project_assigned);
      this.adminservice.AddSafetyInspection(data).subscribe((res) => {
        console.log(res);
        mint.toaster.success('Sucessfully Updated!');
        $('#UpdateQuality').hide();
        this.QualityInspectionlist();
        this.UpdateQualityInspection.reset()
        this.updatesubmitted = false
      }, (error) => {
        console.error(error);
        mint.toaster.error('Somthing went to wrong');
        $('#UpdateQuality').hide();
        this.UpdateQualityInspection.reset()
        this.updatesubmitted = false;
      })
    }

  }

  Addchecklist(event:any){
    console.log(event)
    if (event.target.checked){
      this.sefty_check_list.add(event.target.value)
      console.log(this.sefty_check_list)
      console.log(Array.from (this.sefty_check_list).join(","))
    }
    else{
      this.sefty_check_list.delete(event.target.value)
      console.log(this.sefty_check_list)
      console.log(Array.from (this.sefty_check_list).join(","))

    }

  }

  previewquestion(data:any){
    console.log("preview question")
    $('#AddQuality').hide();
    this.adminservice.saftylibraryQuestionlist(data)
          .subscribe(
            (resp)=>{
              if(resp){
                this.previewquestionlist=resp;
                console.log(resp);
             $('#AddQuality').hide();
              }
              else{
                this.toaster.error("somthing went wrong")
              }
            }
          )
  }

  Select_checklist_saftyquestion(event:any,saftychecklistid:any){
    //this is safty checklist question
    this.selected_safty_checklist=saftychecklistid//this is geting safty checklistid
    console.log(this.selected_safty_checklist)
    if (event.target.checked){
      this.saftychecklistquestion.add(event.target.value)
      console.log(this.saftychecklistquestion)
    }
    else{
      this.saftychecklistquestion.delete(event.target.value)
      console.log(this.saftychecklistquestion)
    }
  }

  ShowSaftyQuestion(id:any){
    console.log(id)
      this.client_id = sessionStorage.getItem('client_id');
      this.adminservice.ShowSaftyQuestionInspection(this.client_id,id).subscribe(
        res=>{
          console.log(res)
          this.questionlist=res
        }
      )
  }


 //ADD QUESTION HERE
 AddSaftyQuestion(){
      var saftychecklistcode:any;
      var flag:any;
      if(this.Qualitylist.length>0)
        {
          for(let item of  this.librarylists)
            {

              if (item.id===this.selected_safty_checklist)
              {
                saftychecklistcode=item.saftychecklistid
                break

              }
            }
          for(let item of this.Qualitylist)
            {
              if(item.saftychecklistid===saftychecklistcode)
              {   flag=false

                  this.client_id = sessionStorage.getItem('client_id');

                  const formData=new FormData();
                  formData.append("client_id",this.client_id);
                  formData.append("seftyquestion",Array.from(this.saftychecklistquestion).join(","))
                  formData.append("seftychecklist",saftychecklistcode)
                  this.adminservice.AddSafetyQuestionInspection(formData).subscribe(
                   (res)=>{
                     console.log(res)
                      this.toaster.success(res.message)
                   },
                   (error)=>{
                     console.log(error)
                     this.toaster.error(error.message)

                   }
                  )
                  break
              }
              else
                  {
                    flag=true
                  }

            }
          if(flag)
          {
            alert("You have to add safty checklist before add safty question")
          }

        }
 }




  // Delete

delete(safty:any){
  this.saftyID = safty
}

  Delete(){
    this.client_id = sessionStorage.getItem('client_id');

    this.adminservice.DeleteSafetyInspection(this.client_id,this.saftyID).subscribe((res) => {
      console.log(res);
      if (res.status){

        this.toaster.success('Sucessfully Deleted!');
        $('#DeleteQuality').hide();
        this.QualityInspectionlist();

      }
      else{
        console.error(res);
        this.toaster.error('Somthing went to wrong!');
        $('#DeleteQuality').hide();

      }

    },)
  }

// checklist view

checklistview(checklist_id:any){
  // $('#ChecklistView').modal('show');
  // this.superadminserivce.allchecklist(checklist_id).subscribe((res)=>{
  //     console.log(res);
  //     this.checklists = res.question;
  //     $('#ChecklistView').modal('show');
      // this.spinner.hide();\
      this.superadminserivce.allsaftychecklist(checklist_id).subscribe((res)=>{
        console.log(res);
      // $('#ChecklistView').modal('show');
        if(res.question.length !== 0){
        this.checklists = res.question;
        this.questiondata = true;
        this.noquestions = false;
        }
        else{
          this.noquestions = true;
          this.questiondata = false;
        }
      $('#ChecklistView').modal('show');
  },(error)=>{
    console.error(error);
    this.toaster.error('Somthing went to wrong!');
  });
}
closechecklist(){
  $('#ChecklistView').modal('hide');
}


AssingProject(saftyid:any){
  this.saftychecklistid=saftyid
  console.log(saftyid)
}


AddProject(event:any){

  if (event.target.checked)
    {
      this.Project.add(event.target.value)
      console.log(this.Project)
    }
  else
    {
      this.Project.delete(event.target.value)
      console.log(this.Project)
    }

}


saftycheckAddOnProject()
  {
    this.client_id = sessionStorage.getItem('client_id');
    console.log(this.client_id)
    console.log(this.saftychecklistid)
    console.log(Array.from( this.Project).join(","))
    const formData=new FormData();
    this.adminservice.AddSaftyInspectionlist(formData,this.client_id,
      this.saftychecklistid,Array.from( this.Project).join(",")

                                                ).subscribe((res)=>{
                                                  if (res.status)
                                                  {
                                                    console.log(res)
                                                    this.toaster.success(this.saftychecklistid,res.message)
                                                    this.QualityInspectionlist();
                                                    this.alllibrarylist();

                                                  }
                                                  else{
                                                    console.log(res)
                                                    this.toaster.error(this.saftychecklistid,res.message)
                                                    this.QualityInspectionlist();
                                                    this.alllibrarylist();

                                                  }

                                                },


                                                )

  }

}
