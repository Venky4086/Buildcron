import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { AuthenticationserviceService } from '../services/authenticationservice.service';
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
  constructor(private auth:AuthenticationserviceService,private adminservice :AdminService,private fb:FormBuilder,private modalService: NgbModal,private toaster:ToastrService,private superadminservice:SuperadminService, private spinner:NgxSpinnerService,private router:Router) { }
  Login = this.fb.group({
    email:['', Validators.required],
    password:['', Validators.required],
    // password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
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
      this.auth.ClientLogin(formData).subscribe((res)=>{
        console.log(res);
        sessionStorage.setItem('client_id',res.client_id);
        this.Login.reset();
        this.submitted = false;
        this.toaster.success('Successfully Login Done');
        this.router.navigate(['/ClientAdmin']);
      },(error)=>{
        console.error(error);
        this.Login.reset();
        this.submitted = false;
        if(error.error.error){
          this.toaster.error(error.error.error);
          this.router.navigate(['/login']);
        }
        else{
        this.toaster.error('Somthing went to wrong');
        this.router.navigate(['/login']);
        }
      });
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
