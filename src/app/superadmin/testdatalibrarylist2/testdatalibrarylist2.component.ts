import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';


@Component({
  selector: 'app-testdatalibrarylist2',
  templateUrl: './testdatalibrarylist2.component.html',
  styleUrls: ['./testdatalibrarylist2.component.css']
})
export class Testdatalibrarylist2Component  {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  test_id:any;
  testlists: any;
  constructor(private fb:FormBuilder,private modalService: NgbModal,private toaster:ToastrService,private superadminservice:SuperadminService, private spinner:NgxSpinnerService) { }
  AddTestdata = this.fb.group({
    date:['', Validators.required],
    id:['', Validators.required],
    name:['', Validators.required],
    type:['', Validators.required],
    status:['', Validators.required]
  });
  UpdateTestdata = this.fb.group({
    date:['', Validators.required],
    id:['', Validators.required],
    name:['', Validators.required],
    type:['', Validators.required],
    status:['', Validators.required]
  });
  ngOnInit(){
   this.allsafetytest();
  }
  get f(){
    return this.AddTestdata.controls
  }
  get u(){
    return this.UpdateTestdata.controls
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

  allsafetytest(){
    this.spinner.show();
    this.superadminservice.allsafetytest().subscribe((res)=>{
       if(res){
         console.log(res);
         this.testlists = res;
         this.spinner.hide();
       }
       else{
         console.warn(res);
       }
    },(error)=>{
      console.error(error);
      this.spinner.hide();
    });
  }

  // Add

  Add(){
    this.submitted = true;
    if(this.AddTestdata.controls){
      return
    }
    else{
      const mint = this
      const formData = new FormData;
      formData.append('date',this.AddTestdata.value.date);
      formData.append('id',this.AddTestdata.value.id);
      formData.append('name',this.AddTestdata.value.name);
      formData.append('type',this.AddTestdata.value.type);
      formData.append('status',this.AddTestdata.value.status);
      this.superadminservice.Addsafetytest(formData).subscribe((res)=>{
        console.log(res);
        mint.toaster.success(res.message);
      },(error)=>{
        console.error(error);
        mint.toaster.error(error.message);
      })
    }
  }

  // update

  Update(){
    this.updatesubmitted = true;
    if(this.UpdateTestdata.controls){
      return
    }
    else{
      const mint = this
      const formData = new FormData;
      formData.append('date',this.UpdateTestdata.value.date);
      formData.append('id',this.UpdateTestdata.value.id);
      formData.append('name',this.UpdateTestdata.value.name);
      formData.append('type',this.UpdateTestdata.value.type);
      formData.append('status',this.UpdateTestdata.value.status);
      this.superadminservice.updatesafetytest(this.test_id,formData).subscribe((res)=>{
        console.log(res);
        mint.toaster.success(res.message);
      },(error)=>{
        console.error(error);
        mint.toaster.error(error.message);
      })
    }
  }

// delete

  Delete(){
    const mint = this;
    this.superadminservice.deletesafetytest(this.test_id).subscribe((res)=>{
      console.log(res);
      mint.toaster.success(res.message);
    },(error)=>{
      console.error(error.error.message);
      mint.toaster.error(error.error.message);
    })
  }



  
}
