import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from '../services/superadmin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  fieldTextType:any;
  roles: any;
  constructor(private fb:FormBuilder,private modalService: NgbModal,private toaster:ToastrService,private superadminservice:SuperadminService, private spinner:NgxSpinnerService,private router:Router) { }
  Login = this.fb.group({
    email:['', Validators.required],
    // password:['', Validators.required],
    password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
  });
  ngOnInit(): void {
  }
  get f(){
    return this.Login.controls
  }
  Submit(){
    this.submitted = true;
    if(this.Login.invalid){
      return
    }
    else{
      const formData = {
        email:this.Login.value.email,
        password:this.Login.value.password
      }
      console.log(formData);
      this.superadminservice.Login(formData).subscribe((res)=>{
        console.log(res);
        sessionStorage.setItem('auth_token', res.access);
        this.router.navigate(['/SuperAdmin']);
        this.roles = res.role;
        // this.toaster.success('Successfully Login Done!')
        if(this.roles === 'SA'){
          this.toaster.error('Use this Credentials in superadmin.buildcron.com');
          // sessionStorage.setItem('company_id',res.company_id);
          // sessionStorage.setItem('company_name',res.company_name);
          // sessionStorage.setItem('first_name',res.first_name);
          // sessionStorage.setItem('adminemail',res.email);
          // sessionStorage.setItem('license_count',res.license_count);
          this.router.navigate(['/login']);
        }
        else{
          // this.toaster.error('You are not authorized to login!');
          this.toaster.success('Successfully Login Done!');
          sessionStorage.setItem('company_id',res.company_id);
          sessionStorage.setItem('company_name',res.company_name);
          sessionStorage.setItem('first_name',res.first_name);
          sessionStorage.setItem('adminemail',res.email);
          sessionStorage.setItem('license_count',res.license_count);
          this.router.navigate(['/ClientAdmin']);
        }
      },(error)=>{
        console.error(error);
        if(error.error.error){
          this.toaster.error(error.error.error);
        }
        else{
        this.toaster.error('Somthing went to wrong');
        }
      });
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
