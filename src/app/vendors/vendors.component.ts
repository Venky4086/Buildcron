import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
declare var $:any;
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
  vendor_name: any;
  address: any;
  email: any;
  contact: any;
  supervisor_name: any;
  supervisor_contact: any;
  totalRecords:any;
  page:any =1;
  constructor(private adminservice:AdminService,private modalService: NgbModal,private fb:FormBuilder,private spinner:NgxSpinnerService,private toaster:ToastrService) { }
  AddVendor = this.fb.group({
    name:['', Validators.required],
    // id:['', Validators.required],
    address:['', Validators.required],
    email:['',[Validators.required,Validators.email]],
    // project_assigned:['', Validators.required],
    contact_no:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    supervisor_name:['',Validators.required],
    supervisor_no:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  });
  UpdateVendor = this.fb.group({
    name:['', Validators.required],
    // id:['', Validators.required],
    address:['', Validators.required],
    email:['',[Validators.required,Validators.email]],
    // project_assigned:['', Validators.required],
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
        this.totalRecords = res.length;
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

view(vendor_id:any,name:any,address:any,email:any,contact:any,supervisor_name:any,supervisor_contact:any){
  $('#VendorView').modal('show');
  this.vendor_id = vendor_id;
  this.vendor_name = name,
  this.address = address,
  this.email = email,
  this.contact = contact,
  this.supervisor_name = supervisor_name,
  this.supervisor_contact = supervisor_contact
  $('#VendorView').modal('show');
}
  vendorclose(){
    $('#VendorView').modal('hide');
  }


  Add(){
    const mint = this
    this.submitted = true;
    if(this.AddVendor.invalid){
      return
    }
    else{
      const data = {
        "name":this.AddVendor.value.name,
        "email":this.AddVendor.value.email,
        "contact":"+91"+this.AddVendor.value.contact_no,
        "address":this.AddVendor.value.address,
        "supervisor_name":this.AddVendor.value.supervisor_name,
        "supervisor_contact":"+91"+this.AddVendor.value.supervisor_no
      }
      // const formData = new FormData;
      // formData.append('date',this.AddVendor.value.date);
      // formData.append('name',this.AddVendor.value.name);
      // formData.append('id',this.AddVendor.value.id);
      // formData.append('address',this.AddVendor.value.designation);
      // formData.append('email',this.AddVendor.value.email);
      // formData.append('project_assigned',this.AddVendor.value.project_assigned);
      // formData.append('mobile',this.AddVendor.value.mobile);
      // formData.append('supervisor_name',this.AddVendor.value.supervisor_name);
      // formData.append('supervisor_no',this.AddVendor.value.supervisor_no);
      console.log(data);
      this.adminservice.Addvendor(data).subscribe((res)=>{
        console.log(res);
        this.allvendors();
        this.AddVendor.reset();
        this.submitted = false;
        mint.toaster.success('Successfully Vendor Created!');
        $('#AddVendor').hide();
      },(error)=>{
        console.error(error);
        // if(error.error.name[0]){
        // mint.toaster.error(error.error.name[0]);
        // }
        // else if(error.error.contact[0]){
        //   mint.toaster.error(error.error.contact[0]);
        // }
        // else{
        mint.toaster.error('Somthing went wrong!');
        // }
        this.AddVendor.reset();
        this.submitted = false;
        $('#AddVendor').hide();
      });
    }
  }

  // update

  edit(vendor_id:any,name:any,address:any,email:any,contact:any,supervisor_name:any,supervisor_contact:any){
   this.vendor_id = vendor_id;
   this.vendor_name = name,
   this.address = address,
   this.email = email,
   this.contact = contact,
   this.supervisor_name = supervisor_name,
   this.supervisor_contact = supervisor_contact
  //  this.adminservice.Singlevendorlist(this.vendor_id).subscribe((res)=>{
  //    console.log(res);
  //  })
  }

  Update(){
    const mint = this
    this.updatesubmitted = true;
    if(this.UpdateVendor.invalid){
      return
    }
    else{
      // const formData = new FormData;
      const data = {
        "name":this.UpdateVendor.value.name,
        "email":this.UpdateVendor.value.email,
        "contact":this.UpdateVendor.value.contact_no,
        "address":this.UpdateVendor.value.address,
        "supervisor_name":this.UpdateVendor.value.supervisor_name,
        "supervisor_contact":this.UpdateVendor.value.supervisor_no
      }
      this.adminservice.Updatevendor(this.vendor_id,data).subscribe((res)=>{
        console.log(res);
        this.allvendors();
        mint.toaster.success('Successfully Vendor Updated!');
        $('#UpdateVendor').hide();
      },(error)=>{
        console.error(error);
        mint.toaster.error('Somthing went wrong!');
        $('#UpdateVendor').hide();
      });
    }
  }

// delete

  delete(vendor_id:any){
    this.vendor_id = vendor_id
  }

  Delete(){
    const mint = this
    this.adminservice.Deletevendor(this.vendor_id).subscribe((res)=>{
      console.log(res);
      mint.toaster.success('Successfully Deleted Vendor!');
      this.allvendors();
      $('#UpdateVendor').hide();
    },(error)=>{
      console.error(error);
      mint.toaster.error('Somthing went wrong!');
      this.allvendors();
      $('#UpdateVendor').hide();
    })
  }

}
