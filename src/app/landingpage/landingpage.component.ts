import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { RegistrationService } from '../services/registration.service';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  Allplanes:any;
  constructor(private Registration:RegistrationService,private router:Router) { }

  ngOnInit(): void {
    this.allplanes();
    AOS.init();
  }


  allplanes(){
    this.Registration.allplanes().subscribe((res)=>{
      if(res){
        console.log(res);
        this.Allplanes = res
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error);
    })
  }

  // buy 

  buynow(planename:any,planeamount:any){
    sessionStorage.setItem('planename', planename);
    sessionStorage.setItem('planeamount', planeamount);
    console.log(planeamount);
    this.router.navigate(['/subscription']);
  }
}
