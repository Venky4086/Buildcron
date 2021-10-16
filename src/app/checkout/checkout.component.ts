import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../services/registration.service';
import { SuperadminService } from '../services/superadmin.service';
declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers:[DatePipe]
})
export class CheckoutComponent implements OnInit {
  submitted = false;
  next: any;
  payment_id: any;
  contactpersons: any;
  planename = sessionStorage.getItem('planename');
  fieldTextType:any;
  
  constructor(private router:Router,private datePipe: DatePipe,private toastr: ToastrService,private spinner: NgxSpinnerService,private modalService: NgbModal,private fb:FormBuilder,private superadminserivce:SuperadminService,private registrationService:RegistrationService) { }
  CompanyRegistration = this.fb.group({
    name:['', Validators.required],
    countryCode:['', Validators.required],
    phone:['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email:['', [Validators.required,Validators.email]],
    username:['', [Validators.required]],
    password:['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    gstno:['', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")]],
    address:['', Validators.required],
    city:['', Validators.required],
    state:['', Validators.required],
    pincode:['', [Validators.required,Validators.pattern("[0-9]{6}$"),Validators.maxLength(6)]],
    // startdate:['', Validators.required],
    // enddate:['', Validators.required],
    // nooflicense:['', Validators.required],
    // contactperson:['', Validators.required],
  }); 
  Total_Amount = sessionStorage.getItem('planeamount')
  ngOnInit(): void {

$(window).scroll(()=>{
      var sticky = $('#header'),
          scroll = $(window).scrollTop();
    
      if (scroll >= 100) sticky.addClass('header-scrolled');
      else sticky.removeClass('header-scrolled');
    });

    // this.contactperson();
    console.log(sessionStorage.getItem('planename'));
  }

  get f(){
    return this.CompanyRegistration.controls
  }

contactperson(){
this.superadminserivce.contactperson().subscribe((res)=>{
  if(res){
    console.log(res)
    this.contactpersons = res
  }
  else{
    console.warn(res);
  }
},(error)=>{
  console.error(error);
})
}

// pay

pay(){
  this.submitted = true;
  if(this.CompanyRegistration.invalid){
    console.log('invalid');
    return
  }
  else{
    const data = {
      "user_details":{
        "first_name":this.CompanyRegistration.value.username,
        "email":this.CompanyRegistration.value.email,
        "phone_number":this.CompanyRegistration.value.countryCode+this.CompanyRegistration.value.phone,
        "password":this.CompanyRegistration.value.password
      },
      "company_details":{
        "name":this.CompanyRegistration.value.name,
        "gstin":this.CompanyRegistration.value.gstno,
        "state":this.CompanyRegistration.value.state,
        "city":this.CompanyRegistration.value.city,
        "addres":this.CompanyRegistration.value.address,
        // "contact_person":this.CompanyRegistration.value.contactperson,
        "pincode":this.CompanyRegistration.value.pincode,
        "status":true
      },
      "plan_details":{
        "name":sessionStorage.getItem('planename'),
        "license_count":sessionStorage.getItem('planecount'),
        "ammount":sessionStorage.getItem('planeamount')
      }
    }
    console.log(data);
     this.registrationService.plane(data).subscribe((res)=>{
     $('#PayModal').modal('show');
     console.log(res);
     this.next = res.next;
     this.payment_id = res.payment_id;
    //  this.toastr.success('Successfully');
   },(error)=>{
     console.error(error);
     this.toastr.error('Somthing went wrong');
   });
  }
}

submit(){
window.open(this.next);
$('#PayModal').modal('hide');
this.router.navigate(['/login']);
}


cancel(){
  $('#PayModal').hide();
}

login(){
  this.router.navigate(['/login']);
}


toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
}
