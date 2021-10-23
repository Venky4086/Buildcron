import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../services/registration.service';
declare var $:any;
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  Allplanes:any;
  submitted = false;
  allplanelength: any;
  constructor(private Registration:RegistrationService,private router:Router,private fb:FormBuilder,private toastr:ToastrService) {
   }

  ngOnInit(): void {

    $(window).scroll(()=>{
      var sticky = $('#header'),
          scroll = $(window).scrollTop();
    
      if (scroll >= 100) sticky.addClass('header-scrolled');
      else sticky.removeClass('header-scrolled');
    });

    this.allplanes();
    AOS.init();
  }
  
  ContactUs = this.fb.group({
    name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    mobile:['',[ Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    address:['', Validators.required],
  })

  allplanes(){
    this.Registration.allplanes().subscribe((res)=>{
      if(res){
        console.log(res);
        this.Allplanes = res;
        this.allplanelength = res.length
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error);
    })
  }
  get f(){
    return this.ContactUs.controls
  }
  // buy 

  buynow(plane_id:any,planename:any,planeamount:any){
    sessionStorage.setItem('plane_id', plane_id);
    sessionStorage.setItem('planename', planename);
    sessionStorage.setItem('planeamount', planeamount);
    // console.log(planeamount);
    this.router.navigate(['/subscription']);
  }

  // login

  login(){
    this.router.navigate(['/login']);
  }

  contact(){
    this.submitted = true;
    if(this.ContactUs.invalid){
      return
    }
    else{
      // console.log(this.ContactUs.value);
    const data = {
      "name":this.ContactUs.value.name,
      "email":this.ContactUs.value.email,
      "phone":"+91"+this.ContactUs.value.mobile,
      "address":this.ContactUs.value.address
    }
   this.Registration.contacts(data).subscribe((res)=>{
     console.log(res);
     this.toastr.success('Sucessfully Contacts Done!')
     this.ContactUs.reset();
     this.submitted = false;
   },(error)=>{
     console.error(error);
     this.ContactUs.reset();
     this.submitted = false;
     this.toastr.error('Somthing went to wrong!')
   });
    }
  }

}
