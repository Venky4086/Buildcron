import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-subscriptionorders',
  templateUrl: './subscriptionorders.component.html',
  styleUrls: ['./subscriptionorders.component.css']
})
export class SubscriptionordersComponent implements OnInit {

  // planename:any;
  // planeamount:any;
  submitted = false;
  planename = sessionStorage.getItem('planename');
  planeamount:any;
  Allplanes: any;
  count: any;
  countamount: any;
  default =true;
  second = false;
  constructor(private fb:FormBuilder,private Registration:RegistrationService,private router:Router) { }
  Subscription = this.fb.group({
    planename:['', Validators.required],
    planenumber:['', Validators.required],
    planeamount:['', Validators.required],
  });
  ngOnInit(): void {
    this.planeamount = sessionStorage.getItem('planeamount');
    this.allplanes()
  }

get f(){
  return this.Subscription.controls
}

data:any[]=[
  {id:1},
  {id:2},
  {id:3},
  {id:4},
  {id:5},
  {id:6},
  {id:7},
  {id:8},
  {id:9},
  {id:10}
]

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

// get planename(){
//   return sessionStorage.getItem('planename');
// }
// get planeamount(){
//   return sessionStorage.getItem('planeamount');
// }

login(){
  this.router.navigate(['/login']);
}

onChange(event:any){
  this.second = true;
  this.default = false;
  console.log(event.target.value);
  this.count = +event.target.value;
  this.countamount = this.count * + this.planeamount;
  // console.log(this.countamount);
  // sessionStorage.setItem('planeamount',this.countamount);
  // window.location.reload();
}

// get planeamo():number{
// return this.pl
// }

checkout(){
  this.submitted = true;
  if(this.Subscription.invalid){
    return
  }
  else{
    sessionStorage.setItem('planename',this.Subscription.value.planename);
    sessionStorage.setItem('planecount',this.Subscription.value.planenumber);
    sessionStorage.setItem('planeamount',this.Subscription.value.planeamount);
    this.router.navigate(['/checkout']);
    // console.log(this.Subscription.value);
  }
}

}
