import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  submitted = false;
  constructor(private spinner:NgxSpinnerService,private fb:FormBuilder) { }
  AddTechnical = this.fb.group({
    email:['', [Validators.required,Validators.email]],
    description:['', Validators.required],
    license_id:['', Validators.required],
    type:['', Validators.required]
  })
  ngOnInit(): void {
    this.spinner.show();
    this.spinner.hide();
  }
get f(){
  return this.AddTechnical.controls
}


// add button

Add(){
this.submitted = true;
if(this.AddTechnical.invalid){
  return 
}
}

}
