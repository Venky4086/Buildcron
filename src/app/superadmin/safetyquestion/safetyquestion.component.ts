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
  totalRecords: any;
  page:any =1;
  count:any = 5;
  excel!:any;
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

  Status:any[]=[
    {id:1,name:'Valid'},
    {id:2,name:'InValid'},
  ]

// list

  list(){
    this.spinner.show();
    this.superservice.allsaftychecklist(sessionStorage.getItem('safety_id')).subscribe((res)=>{
      if(res){
        console.log(res);
        this.checklists = res;
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
      "status": this.AddCheckList.value.status==="Valid" ? true :false,
      "sefty":sessionStorage.getItem('safety_id')
    }
    console.log(data)
    this.superservice.addsaftychecklist(data).subscribe((res)=>{
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

///UPLOAD SAFTYCHECKLIST QUESTION BY EXCEL SHEET
  excelfile(file:any){
    this.excel=<File>file.target.files[0]
    const formData=new FormData();
    formData.append("file",this.excel,this.excel.name)
    this.superservice.ExcelsaftychecklistQuestion(formData).subscribe(
      (res)=>{
        // console.log(res)
        this.list();
        this.toaster.success(res.message)
      },
      (error)=>{
        this.toaster.error(error.statusText,error.status)
        this.list();
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
      //   "pid":sessionStorage.getItem('safety_id')
      // }
      const data = {
        "name": this.UpdateCheckList.value.questionname,
        // "answer": "it regular",
        // "typee":"Safety",
        "status": this.UpdateCheckList.value.status==="Valid" ? true :false,
        // "sefty":sessionStorage.getItem('safety_id')
      }

      console.log(data)
      console.log(this.id)
      this.superservice.updatesaftycheckquestion(this.id,data).subscribe((res)=>{
        console.log(res);
        this.toaster.success('Checklist successfully Updated!');
      $('#UpdateChecklist').hide();
        this.list();
      },(error)=>{
        console.error(error);
        this.toaster.error(error.error.message);
      $('#UpdateChecklist').hide();
      })
    }
  }

  // delete

  delete(id:any){
    this.id = id;
    console.log(this.id)
  }

  Delete(){
    this.superservice.deletesaftychecklist(this.id).subscribe((res)=>{
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
