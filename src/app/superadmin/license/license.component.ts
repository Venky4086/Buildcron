import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css'],
  providers:[SuperadminService]
})
export class LicenseComponent {
  submitted = false;
  updatesubmitted = false;
  closeResult = '';
  alllicenses: any;
  license_id:any;
  user_name: any;
  start_date: any;
  end_date:any;
  user_phone: any;
  user_email: any;
  status: any;
  device_id: any;
  device_name: any;
  users_designation: any;
  license: any;
  users:any;
  tenure:any;
  date1: any;
  date2: any;
  Days:any;
  Months:any;
  Years: any;
  devicelists:any;
  totalRecords:any;
  page:any=1;
  count:any = 5;
  constructor(private router:Router,private toastr: ToastrService,private spinner: NgxSpinnerService,private modalService: NgbModal,private fb:FormBuilder,private superadminserivce:SuperadminService) { }
    AddLicense = this.fb.group({
      
      user_info:['', Validators.required],
      start_date:['', Validators.required],
      end_date:['', Validators.required],
      // tenure:['', Validators.required],
      device_name:['', Validators.required],
      designation:['', Validators.required]
    })
    UpdateLicense = this.fb.group({
      // id:['', Validators.required],
      // client_id:['', Validators.required],
      user_info:['', Validators.required],
      start_date:['', Validators.required],
      end_date:['', Validators.required],
      // mobile:['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      // email:['', [Validators.required,Validators.email]],
      status:['', Validators.required],
      // device_id:['', Validators.required],
      device_name:['', Validators.required],
      designation:['', Validators.required]
    })
    ngOnInit() {
      this.allLicenseData();
      this.allcompanydetails();
      // this.device_list();
      }
    get f(){
      return this.AddLicense.controls
    }
    get u(){
      return this.UpdateLicense.controls
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

    // device_list

  device_list(){
    this.superadminserivce.device_list().subscribe((res)=>{
      if(res){
        console.log(res);
        this.devicelists = res;
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.log(error.error.message);
    })
  }

// user data

  allcompanydetails(){
    this.spinner.show();
    this.superadminserivce.allcompanyregistrationdata().subscribe((res)=>{
      if(res){
        console.log(res);
        this.users = res
        this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error)
    })
  }

  // all license data

  allLicenseData(){
    this.spinner.show();
    this.superadminserivce.alllicensedata().subscribe((res)=>{
      if(res){
        console.log(res);
        this.alllicenses = res;
        this.totalRecords = res.length;
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

// dates

  startdate(startdate:any){
  console.log(startdate);
  this.date1 = new Date(startdate);
  }

  enddate(enddate:any){
    console.log(enddate);
    this.date2 = new Date(enddate);
    var Time = this.date2.getTime() - this.date1.getTime();
    this.Days = Time / (1000 * 3600 * 24)+'days';
    console.log(this.Days);
    var months = (this.date2.getTime() - this.date1.getTime()) / 1000
    this.Months =  months / (60 * 60 * 24 * 7 * 4)+'months'
    console.log(this.Months);
    this.Years = months/(60 * 60 * 24)+'years'
    console.log(this.Years)
  }

// Add license data

  Add(){
    const mint = this;
    this.submitted = true;
    if(this.AddLicense.invalid){
      return
    }
    else{
      const formData = new FormData;

      formData.append('user_info', this.AddLicense.value.user_info);
      formData.append('created_at', this.AddLicense.value.start_date);
      formData.append('end_at', this.AddLicense.value.end_date);
      // formData.append('tenure', this.Days);
      formData.append('device_name', this.AddLicense.value.device_name);
      formData.append('designation', this.AddLicense.value.designation)

      this.superadminserivce.Addlicense(formData).subscribe((res)=>{
        console.log(res);
        mint.toastr.success('Successfully License Added!');
        this.allLicenseData();
       },(error)=>{
         console.error(error);
        mint.toastr.error(error.error.message);
       });
    }
  }

// view

  Details(license_id:any,user_name:any,start_date:any,user_phone:any,user_email:any,status:any,device_id:any,device_name:any,users_designation:any){
    // console.log(license_id);
    this.license_id = license_id;
    this.user_name = user_name;
    this.start_date =start_date;
    this.user_phone = user_phone;
    this.user_email = user_email;
    this.status = status;
    this.device_id = device_id;
    this.device_name = device_name;
    this.users_designation = users_designation;
  }

  // Update license data

  Edit(license_id:any,user_name:any,start_date:any,user_phone:any,user_email:any,status:any,device_id:any,device_name:any,users_designation:any){
    // console.log(license_id);
    this.license_id = license_id;
    this.user_name = user_name;
    this.start_date =start_date;
    this.user_phone = user_phone;
    this.user_email = user_email;
    this.status = status;
    this.device_id = device_id;
    this.device_name = device_name;
    this.users_designation = users_designation;
  }

  Update(){
   this.updatesubmitted = true;
   if(this.UpdateLicense.invalid){
     return
   }
   else{
    const mint = this;
    const formData = new FormData;
    // formData.append('client',this.AddLicense.value.client_id);
    formData.append('user_name', this.UpdateLicense.value.user_name);
    formData.append('start_date', this.UpdateLicense.value.start_date);
    formData.append('user_phone',this.UpdateLicense.value.mobile);
    formData.append('user_email',this.UpdateLicense.value.email);
    formData.append('status',this.UpdateLicense.value.status);
    formData.append('device_id', this.UpdateLicense.value.device_id);
    formData.append('device_name', this.UpdateLicense.value.device_name);
    formData.append('users_designation', this.UpdateLicense.value.designation)
    this.superadminserivce.updatelicense(this.license_id,formData).subscribe((res)=>{
      console.log(res)
      mint.toastr.success(res.message);
     },(error)=>{
       console.error(error);
       mint.toastr.error(error.error.message);
     });
  }
  }

  // delete license data

  delete(id:any){
    this.license_id = id;
  }

  Delete(){
    const mint = this
   this.superadminserivce.deletelicense(this.license_id).subscribe((res)=>{
      console.log(res);
     mint.toastr.success('Successfully license deleted!');
     this.allLicenseData();
   },(error)=>{
     console.log(error);
     mint.toastr.error('Somthing went to wrong');
   })
  }

  single_license_details(company:any){
   sessionStorage.setItem('c_name',company);
   this.router.navigate(['/Usedlicense']);
  }

}
