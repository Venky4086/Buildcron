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
  planeamount = sessionStorage.getItem('planeamount');
  Allplanes: any;
  constructor(private fb:FormBuilder,private Registration:RegistrationService,private router:Router) { }
  Subscription = this.fb.group({
    planename:['', Validators.required],
    planenumber:['', Validators.required],
    planeamount:['', Validators.required],
  });
  ngOnInit(): void {
    this.allplanes()
  }

get f(){
  return this.Subscription.controls
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

// get planename(){
//   return sessionStorage.getItem('planename');
// }
// get planeamount(){
//   return sessionStorage.getItem('planeamount');
// }


}
