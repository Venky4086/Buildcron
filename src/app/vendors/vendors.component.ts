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
  count:any = 10;
  client_id: any;
  ///
  ClientProject:any[]=[];

  Project =new Set();
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
    this.allprojects();
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
    this.client_id = sessionStorage.getItem('client_id')
    this.spinner.show();
    this.adminservice.vendorslist(this.client_id).subscribe((res)=>{
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


//ALL PROJECT
//ALL PROJECT OF THIS CLIENT
allprojects(){
  this.client_id = sessionStorage.getItem('client_id');
  this.spinner.show();
  this.adminservice.Projectslist(this.client_id).subscribe((res)=>{
    if(res){

      console.log(res);
      this.ClientProject = res;
      // this.totalRecords = res.length
      this.spinner.hide();
    }
    else{
      console.warn(res);
    }
  },(error)=>{
    console.error(error);
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
      this.client_id = sessionStorage.getItem('client_id')
      const data = {
        "vendor_name":this.AddVendor.value.name,
        "email":this.AddVendor.value.email,
        "contact_no":"+91"+this.AddVendor.value.contact_no,
        "address":this.AddVendor.value.address,
        "supervisor_name":this.AddVendor.value.supervisor_name,
        "supervisor_contact":"+91"+this.AddVendor.value.supervisor_no
      }
      console.log(data);
      this.adminservice.Addvendor(this.client_id,data).subscribe((res)=>{
        console.log(res);
        this.allvendors();
        this.AddVendor.reset();
        this.submitted = false;
        mint.toaster.success('Successfully Vendor Created!');
        $('#AddVendor').hide();
      },(error)=>{
        console.error(error);
        this.AddVendor.reset();
        this.submitted = false;
        if(error.error.message){
        mint.toaster.error(error.error.message);
        }
        else{
        mint.toaster.error('Somthing went wrong!');
        }
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
  }

  Update(){
    const mint = this
    this.updatesubmitted = true;
    if(this.UpdateVendor.invalid){
      return
    }
    else{
      const data = {
        "vendor_name":this.UpdateVendor.value.name,
        "email":this.UpdateVendor.value.email,
        "contact_no":this.UpdateVendor.value.contact_no,
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
       if(error.error.message){
        mint.toaster.error(error.error.message);
       }
       else{
        mint.toaster.error('Somthing went wrong!');
       }
        $('#UpdateVendor').hide();
      });
    }
  }

  //GET VENDOR ID
  AssingProject(vendor:any){
    console.log(this.vendor_id=vendor)
  }
  AddProject(event:any){
    console.log(event.target.value)


  if (this.Project.has(event.target.value))
    {
      this.Project.delete(event.target.value)
      console.log(this.Project)
      console.log(Array.from( this.Project).join(","))
      console.log()
    }
  else
    {
      this.Project.add(event.target.value)
      console.log(this.Project)
      console.log(Array.from( this.Project ).join(","))
    }


}

VendorAssingOnProject(){

  this.client_id = sessionStorage.getItem('client_id');
  console.log(this.client_id)
  console.log(this.vendor_id)
  console.log(Array.from( this.Project).join(","))
  const formData=new FormData();
  this.adminservice.Assigneed_Project_Vendor(formData,this.client_id,
                                                this.vendor_id,Array.from( this.Project).join(",")

                                              ).subscribe((res)=>{
                                                if (res.status)
                                                {
                                                  console.log(res)
                                                  this.toaster.success(this.vendor_id,res.message)
                                                  this.allvendors();
                                                }
                                                else{
                                                  this.toaster.error(this.vendor_id,res.message)
                                                }

                                              }


                                              )

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
      $('#DeleteVendor').hide();
    },(error)=>{
      console.error(error);
      mint.toaster.error('Somthing went wrong!');
      this.allvendors();
      $('#DeleteVendor').hide();
    })
  }

}
