import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { SuperadminService } from 'src/app/services/superadmin.service';
declare var $:any;
@Component({
  selector: 'app-quality-inspection',
  templateUrl: './quality-inspection.component.html',
  styleUrls: ['./quality-inspection.component.css']
})


export class QualityInspectionComponent {
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
  count:any = 10;
  client_id: any;
  quality_checklist=new Set();
  previewquestionlist:any[]=[];
  qualityID:any;

  //
  qualitychecklistCode:any;
  Project =new Set()
  qualityquestion =new Set()
  qualitychecklistid:any;
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
    //this.allprojects();
    this.alllibrarylist();
    this.allprojects();
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
    console.log("==================")

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
    this.client_id = sessionStorage.getItem('client_id');
    // this.spinner.show();
    this.adminservice.Projectslist(this.client_id).subscribe((res)=>{
      if(res){
        console.log(res);
        this.projectlist = res;
        console.log("===============================")
        console.log(res)
        // this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error);
      this.spinner.hide();
    })
  }

  // all librarylist

  alllibrarylist(){
    // this.spinner.show();
    let tmp:any[] = [];
    this.adminservice.alllibrarylist().subscribe((res)=>{
      if(res){
        console.log(res);
        this.librarylists = res;
        for(let i=0; i < this.librarylists.length; i++) {
          tmp.push({ item_id: this.librarylists[i].qualityid, item_text: this.librarylists[i].name });
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
    this.adminservice.QualityInspectionlist(sessionStorage.getItem('client_id')).subscribe((res) => {
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
          "qualitychecklist":Array.from( this.quality_checklist).join(","),
          'client_id':sessionStorage.getItem('client_id'),
        }

      console.log(data);
      this.adminservice.AddQualityInspection(data).subscribe((res) => {
        console.log(res);
        this.toaster.success(res.message);
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
            "quality":this.cheklistList
          }
      // const formData = new FormData;
      // formData.append('date', this.UpdateQualityInspection.value.date);
      // formData.append('name', this.UpdateQualityInspection.value.name);
      // formData.append('description', this.UpdateQualityInspection.value.description);
      // formData.append('uploaded', this.UpdateQualityInspection.value.uploaded);
      // formData.append('project_assigned', this.UpdateQualityInspection.value.project_assigned);
      this.adminservice.AddQualityInspection(data).subscribe((res) => {
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

  //NEW CHECKLIST ADD
  AddQualitychecklist(event:any){
  if(event.target.checked){
    this.quality_checklist.add(event.target.value)
    console.log(Array.from(this.quality_checklist).join(","))
    }
  else
  {
    this.quality_checklist.delete(event.target.value)
    console.log(Array.from( this.quality_checklist).join(","))

  }

  }

  previewquestion(data:any,item:any){
    $('#AddQuality').hide();
    this.qualitychecklistid=item
    console.log(this.qualitychecklistid)
    this.adminservice.libraryquestionlist(data).subscribe(
      (resp)=>{
        if (resp){
          console.log("previews question")
          console.log(resp)
          this.previewquestionlist=resp;
          $('#AddQuality').hide();
        }
        else{
          this.toaster.error("somthing missing!")
        }
      }
    )
  }

  selectqualityquestion(event:any)

  {
    console.log(this.qualitychecklistid)
    if(event.target.checked)
      {
        this.qualityquestion.add(event.target.value)
        console.log(Array.from(this.qualityquestion).join(","))
      }
    else
    {
      this.qualityquestion.delete(event.target.value)
      console.log(Array.from( this.qualityquestion).join(","))

    }

  }

  AddQualityChecklistQuetion()
    {
      var flag:any;

      if( this.Qualitylist.length>0)
        {
          console.log(this.qualitychecklistid)
          for(let item of this.Qualitylist)

            {

                console.log(item.qualityid)
                if (item.qualityid===this.qualitychecklistid)
                  {

                    this.client_id = sessionStorage.getItem('client_id');

                    const formData=new FormData();
                    formData.append("client_id",this.client_id);
                    formData.append("qualityquestion",Array.from(this.qualityquestion).join(","))
                    formData.append("qualitychecklist",this.qualitychecklistid)
                    this.adminservice.AddQualityQuestionInspection(formData).subscribe(
                    (res)=>{

                      this.toaster.success(res.message)
                    },
                    (error)=>{

                      this.toaster.error(error.message)

                    }
                    )
                    flag=false
                    break
                  }
                else
                  {
                    flag=true
                  }

            }

          if(flag)
            {
              alert("your have to add quality checklist first")
            }
        }

    }

  ShowQualityQuestion(id:any)
    {
      console.log(id)
      this.client_id = sessionStorage.getItem('client_id');
      this.adminservice.ShowQualityQuestionInspection(this.client_id,id).subscribe(
        res=>{
          console.log(res)
          this.questionlist=res
        }
      )
    }
  // Delete

delete(qualityid:any){
this.qualityID = qualityid
}

  Delete(){
    const mint = this
    this.client_id = sessionStorage.getItem('client_id');
    this.adminservice.DeleteQualityInspection(this.client_id,this.qualityID).subscribe((res) => {
      console.log(res);
      if (res.status){
        mint.toaster.success('Sucessfully Deleted!');
          $('#DeleteQuality').hide();
          this.QualityInspectionlist();
          this.alllibrarylist();
          $('#DeleteQuality').hide();

      }
      else{
        console.error(res);
        this.toaster.error(res.message)
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
      this.superadminserivce.allchecklist(checklist_id).subscribe((res)=>{
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

//ASSING PROJECT PART
AssingProject(data:any){
  this.qualitychecklistCode=data
  console.log(this.qualitychecklistCode)



}

  AddProject(event:any){

    if (event.target.checked)
      {
        this.Project.add(event.target.value)

        console.log(this.Project)
        // console.log(Array.from( this.Project).join(","))

      }
    else
      {
        this.Project.delete(event.target.value)
        console.log(this.Project)
        // console.log(Array.from( this.Project ).join(","))
      }

}


qualitycheckAddOnProject()
{
  this.client_id = sessionStorage.getItem('client_id');
  console.log(this.client_id)
  console.log(this.qualitychecklistCode)
  console.log(Array.from( this.Project).join(","))
  const formData=new FormData();
  this.adminservice.AddQualityInspectionlist(formData,this.client_id,
                                                this.qualitychecklistCode,Array.from( this.Project).join(",")

                                              ).subscribe((res)=>{
                                                if (res.status)
                                                {
                                                  console.log(res)
                                                  this.toaster.success(this.qualitychecklistCode,res.message)
                                                  this.QualityInspectionlist();
                                                  this.alllibrarylist();

                                                }
                                                else{
                                                  console.log(res)
                                                  this.toaster.error(this.qualitychecklistCode,res.message)
                                                  this.QualityInspectionlist();
                                                  this.alllibrarylist();

                                                }

                                              },


                                              )
}
  }


