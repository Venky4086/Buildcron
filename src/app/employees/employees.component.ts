import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  employe_id:any;
  employelist:any;
  constructor(private adminservice:AdminService,private modalService: NgbModal,private fb:FormBuilder,private spinner:NgxSpinnerService,private toaster:ToastrService) { }
  AddEmployee = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    id:['', Validators.required],
    designation:['', Validators.required],
    email:['',[Validators.required,Validators.email]],
    mobile:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    project_assigned:['', Validators.required]
  });
  UpdateEmployee = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    id:['', Validators.required],
    designation:['', Validators.required],
    email:['',[Validators.required,Validators.email]],
    mobile:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    project_assigned:['', Validators.required]
  });
  ngOnInit(){
    this.allemploys();
  }
  get f(){
    return this.AddEmployee.controls
  }
  get u(){
    return this.UpdateEmployee.controls
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

  // employe list

  allemploys(){
    this.spinner.show();
    this.adminservice.Employeslist().subscribe((res)=>{
      if(res){
        console.log(res);
        this.employelist = res;
        this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error.error.message);
      this.spinner.hide();
    })
  }

  // Add

  Add(){
    const mint = this
    this.submitted = true;
    if(this.AddEmployee.invalid){
      return
    }
    else{
      const formData = new FormData;
      formData.append('date',this.AddEmployee.value.date);
      formData.append('name',this.AddEmployee.value.name);
      formData.append('id',this.AddEmployee.value.id);
      formData.append('designation',this.AddEmployee.value.designation);
      formData.append('email',this.AddEmployee.value.email);
      formData.append('mobile',this.AddEmployee.value.mobile);
      formData.append('project_assigned',this.AddEmployee.value.project_assigned);
      this.adminservice.AddEmploye(formData).subscribe((res)=>{
        console.log(res)
        mint.toaster.success(res.message);
      },(error)=>{
        console.error(error);
        mint.toaster.error(error.error.message);
      });
    }
  }

  // update

  Update(){
    const mint = this
    this.updatesubmitted = true;
    if(this.UpdateEmployee.invalid){
      return
    }
    else{
      const formData = new FormData;
      formData.append('date',this.UpdateEmployee.value.date);
      formData.append('name',this.UpdateEmployee.value.name);
      formData.append('id',this.UpdateEmployee.value.id);
      formData.append('designation',this.UpdateEmployee.value.designation);
      formData.append('email',this.UpdateEmployee.value.email);
      formData.append('mobile',this.UpdateEmployee.value.mobile);
      formData.append('project_assigned',this.UpdateEmployee.value.project_assigned);
      this.adminservice.UpdateEmploye(this.employe_id,formData).subscribe((res)=>{
        console.log(res)
        mint.toaster.success(res.message);
      },(error)=>{
        console.error(error);
        mint.toaster.error(error.error.message);
      });
    }
  }

// delete

Delete(){
  const mint = this
  this.adminservice.DeleteEmploye(this.employe_id).subscribe((res)=>{
    console.log(res);
    mint.toaster.success(res.message);
  },(error)=>{
    console.error(error);
    mint.toaster.error(error.errror.message);
  })
}

}
