import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThrowStmt } from '@angular/compiler';
declare var $:any;
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent  {

  closeResult = '';
  checklists:any;
  showchecklist!:boolean;
  id: any;
  name: any;
  checklist_id: any;
  text: any;
  status: any;
  totalRecords: any;
  page:any =1;
  count:any = 5;
  nodatafound = false;
  check_id:any;
  excel!:File;
  constructor(private spinner:NgxSpinnerService,
              private superservice:SuperadminService,
              private modalService: NgbModal,
              private fb:FormBuilder,
              private toaster:ToastrService) { }
  submitted = false;
  updatesubmitted = false;
  AddCheckList = this.fb.group({
    name:['', Validators.required],
    // text:['', Validators.required],
    status:['', Validators.required],
  });
  UpdateCheckList = this.fb.group({
    questionname:['', Validators.required],
    // text:['', Validators.required],
    status:['', Validators.required],
  });
  ngOnInit(){
    this.list();
    // console.log(sessionStorage.getItem('quality_id'));
  }

  get f(){
    return this.AddCheckList.controls
  }

  get u(){
    return this.UpdateCheckList.controls
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

// list

  list(){
    this.spinner.show();
    console.log(sessionStorage.getItem('quality_id'));
    this.check_id = sessionStorage.getItem('quality_id')
    this.superservice.allchecklist(this.check_id).subscribe((res)=>{
      if(res){
        console.log(res);
        this.checklists = res;
        console.log('checklist length',this.checklists.length);
        if(this.checklists.length !=0){
          this.showchecklist = true;
        }
        else{
          this.showchecklist = false;
        }
        this.totalRecords = res.length;
        this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error);
    })
  }

// add

  Add(){
  this.submitted = true;
  if(this.AddCheckList.invalid){
    return
  }
  else{
    const data = {
      "name": this.AddCheckList.value.name,
      // "answer": "it regular",
      // "admin_status": this.AddCheckList.value.status,
      "quality":sessionStorage.getItem('quality_id'),
      // "typee":"Quality"
    }

    console.log(data);
    this.superservice.Addchecklist(data).subscribe((res)=>{
      console.log(res);
      this.toaster.success('Successfully Checklist Added !');
      this.list();
      $('#AddChecklist').hide();
      this.AddCheckList.reset();
      this.submitted = false;
    },(error)=>{
      console.error(error);
      this.toaster.error('Somthing went wrong');
      $('#AddChecklist').hide();
      this.AddCheckList.reset();
      this.submitted = false;
    })
  }
  }

//  EXCEL UPLOAD QUESTION FOR QUALITY CHECKLIST
excelfile(file:any){
  this.excel=<File>file.target.files[0];
  const formData=new FormData();
  formData.append("file",this.excel,this.excel.name)
  this.superservice.ExcelQualitylibraryQuesiton(formData).subscribe((res)=>{

      this.toaster.success(res.message,res.status)
      this.list();

  },

  (error)=>{
    this.toaster.error(error.statusText,error.status)
  }

  )


}


  // view

  view(id:any,name:any,checklist_id:any,status:any){
    this.id = id;
    this.name = name;
    this.checklist_id = checklist_id;
    // this.text = text;
    this.status = status;
  }

// update

  edit(id:any,name:any,checklist_id:any,status:any){
    this.id = id;
    this.name = name;
    this.checklist_id = checklist_id;
    // this.text = text;
    this.status = status;
  }

  Update(){
    this.updatesubmitted = true;
    if(this.UpdateCheckList.invalid){
      return
    }
    else{
      // const data = {
      //   "question": this.UpdateCheckList.value.questionname,
      //   "answer": "it regular",
      //   "status": this.UpdateCheckList.value.status,
      //   "pid":sessionStorage.getItem('quality_id')
      // }
       const data = {
        "question": this.UpdateCheckList.value.questionname,
        // "answer": "it regular",
        "admin_status": this.UpdateCheckList.value.status,
        "type_id":sessionStorage.getItem('quality_id'),
        "typee":"Quality"
      }
       // const formData = new FormData
      // formData.append('name',this.UpdateCheckList.value.name),
      // formData.append('text',this.UpdateCheckList.value.text),
      // formData.append('status',this.UpdateCheckList.value.status)
      this.superservice.updatechecklist(this.id,data).subscribe((res)=>{
        console.log(res);
        this.toaster.success('Checklist successfully Updated!');
      $('#UpdateChecklist').hide();
        this.list();
      },(error)=>{
        console.error(error);
        this.toaster.error('Somthing went to wrong');
      $('#UpdateChecklist').hide();
      })
    }
  }
  // delete

  delete(id:any){
    this.id = id;
  }

  Delete(){
    this.superservice.deletechecklist(this.id).subscribe((res)=>{
      console.log(res);
      this.toaster.success('Succesfully Checklist deleted!');
      this.list();
      $('#DeleteChecklist').hide();
    },(error)=>{
      console.error(error);
      this.toaster.error('Somthing went to wrong!');
      $('#DeleteChecklist').hide();
    })
  }

Status:any[]=[
  {id:1,name:'Valid'},
  {id:2,name:'InValid'},
]
}
