import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private adminservice:AdminService,private fb:FormBuilder,private registration:RegistrationService, private toaster:ToastrService) { }
  fieldTextType:any;
  currentpasw:any;
  newpasw:any;
  submitted = false;
  ChangePassword = this.fb.group({
   c_password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
   n_password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
  //  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]
   r_password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
  });
  ngOnInit(): void {
  }
  get f(){
    return this.ChangePassword.controls
  }
  Curentpassword(){
    this.currentpasw = !this.currentpasw;
  }
  Newpassword(){
    this.newpasw = !this.newpasw;
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

submit(){
  this.submitted = true;
  if(this.ChangePassword.invalid){
    return
  }
  else{
    console.log(this.ChangePassword.value);
    // const data = {
    //   'currentpassword':this.ChangePassword.value.c_password,
    //   'newpassword':this.ChangePassword.value.n_password,
    //   'reenterpassword':this.ChangePassword.value.r_password,
    // }
    const data ={
      "old_password":this.ChangePassword.value.c_password,
      "new_password":this.ChangePassword.value.n_password,
      "confirm_new_password":this.ChangePassword.value.r_password
    }
    this.adminservice.changepassword(data).subscribe((res)=>{
        console.log(res);
        this.toaster.success(res.status);
        this.ChangePassword.reset();
        this.submitted = false;
    },(error)=>{
      console.error(error);
      if(error){
        this.toaster.error(error.error);
        this.ChangePassword.reset();
        this.submitted = false;
      }
      else{
        this.toaster.error('Somthing went wrong!');
        this.ChangePassword.reset();
      }
    })
  }
}

}
