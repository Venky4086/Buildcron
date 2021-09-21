import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-safetyquestion',
  templateUrl: './safetyquestion.component.html',
  styleUrls: ['./safetyquestion.component.css']
})
export class SafetyquestionComponent implements OnInit {
  closeResult = '';
  checklists:any;
  id: any;
  name: any;
  checklist_id: any;
  text: any;
  status: any;
  constructor(private spinner:NgxSpinnerService,private superservice:SuperadminService,private modalService: NgbModal,private fb:FormBuilder,private toaster:ToastrService) { }
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
    this.superservice.allsaftychecklist(sessionStorage.getItem('safety_id')).subscribe((res)=>{
      if(res){
        console.log(res);
        this.checklists = res.checklist;
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
      "question": this.AddCheckList.value.name,
      "answer": "it regular",
      "status": this.AddCheckList.value.status,
      "pid":sessionStorage.getItem('safety_id')
    }
    // console.log(this.AddCheckList.value);
    // const formData = new FormData
    // formData.append('name',this.AddCheckList.value.name)
    // formData.append('text',this.AddCheckList.value.text)
    // formData.append('status',this.AddCheckList.value.status)
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
      const data = {
        "question": this.UpdateCheckList.value.questionname,
        "answer": "it regular",
        "status": this.UpdateCheckList.value.status,
        "pid":sessionStorage.getItem('safety_id')
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
}
