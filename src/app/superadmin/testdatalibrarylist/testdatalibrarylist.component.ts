import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-testdatalibrarylist',
  templateUrl: './testdatalibrarylist.component.html',
  styleUrls: ['./testdatalibrarylist.component.css']
})
export class TestdatalibrarylistComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted= false;
  test_id:any;
  testdatas: any;
  constructor(private fb:FormBuilder,private modalService: NgbModal,private toaster:ToastrService,private superadminservice:SuperadminService, private spinner:NgxSpinnerService) { }
  AddTestdataLibrarylist = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    phase:['', Validators.required],
    id:['', Validators.required],
    location:['', Validators.required],
    type:['', Validators.required],
    approver:['', Validators.required]
  })
  UpdateTestdataLibrarylist = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    phase:['', Validators.required],
    id:['', Validators.required],
    location:['', Validators.required],
    type:['', Validators.required],
    approver:['', Validators.required]
  })
  ngOnInit(){
    this.alltestdata();
  }
  get f(){
    return this.AddTestdataLibrarylist.controls
  }
  get u(){
    return this.UpdateTestdataLibrarylist.controls
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

  // allTestdataLibrarylist

  alltestdata(){
    this.spinner.show();
   this.superadminservice.alltestlibrarylist().subscribe((res)=>{
      if(res){
        this.spinner.hide();
        console.log(res);
        this.testdatas = res;
      }
      else{
        console.warn(res);
      }
   },(error)=>{
     console.error(error);
   })
  }

  // Add

  Add(){
    const mint = this
    this.submitted = true;
    if(this.AddTestdataLibrarylist.invalid){
      return
    }
    else{
      const formData = new FormData;
      formData.append('date',this.AddTestdataLibrarylist.value.date);
      formData.append('name',this.AddTestdataLibrarylist.value.name);
      formData.append('phase',this.AddTestdataLibrarylist.value.phase);
      formData.append('id',this.AddTestdataLibrarylist.value.id);
      formData.append('location',this.AddTestdataLibrarylist.value.location);
      formData.append('type',this.AddTestdataLibrarylist.value.type);
      formData.append('approver',this.AddTestdataLibrarylist.value.approver);
      this.superadminservice.Addtestlibrarylist(formData).subscribe((res)=>{
        console.log(res);
        mint.toaster.success(res.message);
      },(error)=>{
        console.error(error);
        mint.toaster.error(error.error.message)
      })
    }
  }

  // Update

  Update(){
    const mint = this
     this.updatesubmitted = true;
     if(this.UpdateTestdataLibrarylist.invalid){
       return
     }
     else{
       console.log(this.UpdateTestdataLibrarylist.value);
       const formData = new FormData;
       formData.append('date',this.UpdateTestdataLibrarylist.value.date);
       formData.append('name',this.UpdateTestdataLibrarylist.value.name);
       formData.append('phase',this.UpdateTestdataLibrarylist.value.phase);
       formData.append('id',this.UpdateTestdataLibrarylist.value.id);
       formData.append('location',this.UpdateTestdataLibrarylist.value.location);
       formData.append('type',this.UpdateTestdataLibrarylist.value.type);
       formData.append('approver',this.UpdateTestdataLibrarylist.value.approver);
       this.superadminservice.updatetestlibrarylist(this.test_id,formData).subscribe((res)=>{
        console.log(res);
         mint.toaster.success(res.message);
       },(error)=>{
         console.error(error);
         mint.toaster.error(error.error.message);
       })
     }
  }
 
// Delete

 Delete(){
   const mint = this
   this.superadminservice.deletetestlibrarylist(this.test_id).subscribe((res)=>{
     console.log(res);
     mint.toaster.success(res.message);
   },(error)=>{
     console.error(error);
     mint.toaster.error(error.errro.message);
   })
 }

}
