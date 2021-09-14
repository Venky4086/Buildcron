import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  vendor_id:any;
  vendorlist:any;
  constructor(private adminservice:AdminService,private modalService: NgbModal,private fb:FormBuilder,private spinner:NgxSpinnerService,private toaster:ToastrService) { }
  AddVendor = this.fb.group({
    name:['', Validators.required],
    id:['', Validators.required],
    address:['', Validators.required],
    email:['',[Validators.required,Validators.email]],
    project_assigned:['', Validators.required],
    contact_no:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    supervisor_name:['',Validators.required],
    supervisor_no:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  });
  UpdateVendor = this.fb.group({
    name:['', Validators.required],
    id:['', Validators.required],
    address:['', Validators.required],
    email:['',[Validators.required,Validators.email]],
    project_assigned:['', Validators.required],
    contact_no:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    supervisor_name:['',Validators.required],
    supervisor_no:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  });
  ngOnInit(){
    this.allvendors();
  }
  get f(){
    return this.AddVendor.controls
  }
  get u(){
    return this.UpdateVendor.controls
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

  allvendors(){
    this.spinner.show();
    this.adminservice.vendorslist().subscribe((res)=>{
      if(res){
        console.log(res);
        this.vendorlist = res;
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
    if(this.AddVendor.invalid){
      return
    }
    else{
      const formData = new FormData;
      formData.append('date',this.AddVendor.value.date);
      formData.append('name',this.AddVendor.value.name);
      formData.append('id',this.AddVendor.value.id);
      formData.append('address',this.AddVendor.value.designation);
      formData.append('email',this.AddVendor.value.email);
      formData.append('project_assigned',this.AddVendor.value.project_assigned);
      formData.append('mobile',this.AddVendor.value.mobile);
      formData.append('supervisor_name',this.AddVendor.value.supervisor_name);
      formData.append('supervisor_no',this.AddVendor.value.supervisor_no);
      this.adminservice.Addvendor(formData).subscribe((res)=>{
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
    if(this.UpdateVendor.invalid){
      return
    }
    else{
      const formData = new FormData;
      formData.append('date',this.UpdateVendor.value.date);
      formData.append('name',this.UpdateVendor.value.name);
      formData.append('id',this.UpdateVendor.value.id);
      formData.append('address',this.UpdateVendor.value.designation);
      formData.append('email',this.UpdateVendor.value.email);
      formData.append('project_assigned',this.UpdateVendor.value.project_assigned);
      formData.append('mobile',this.UpdateVendor.value.mobile);
      formData.append('supervisor_name',this.UpdateVendor.value.supervisor_name);
      formData.append('supervisor_no',this.UpdateVendor.value.supervisor_no);
      this.adminservice.Updatevendor(this.vendor_id,formData).subscribe((res)=>{
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
    this.adminservice.Deletevendor(this.vendor_id).subscribe((res)=>{
      console.log(res);
      mint.toaster.success(res.message);
    },(error)=>{
      console.error(error);
      mint.toaster.error(error.errror.message);
    })
  }
}
