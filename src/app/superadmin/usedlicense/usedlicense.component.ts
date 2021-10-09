import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';

@Component({
  selector: 'app-usedlicense',
  templateUrl: './usedlicense.component.html',
  styleUrls: ['./usedlicense.component.css']
})
export class UsedlicenseComponent implements OnInit {
  alllicenses: any;
  singlelicenses: any;

  constructor(private toastr: ToastrService,private spinner: NgxSpinnerService,private modalService: NgbModal,private fb:FormBuilder,private superadminserivce:SuperadminService) { }

  ngOnInit(): void {
    this.allLicenseData();
    this.single_licenses();
  }
  allLicenseData(){
    this.spinner.show();
    this.superadminserivce.alllicensedata().subscribe((res)=>{
      if(res){
        console.log(res);
        this.alllicenses = res;
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
  single_licenses(){
    this.spinner.show();
    this.superadminserivce.singleicensedata(sessionStorage.getItem('c_name')).subscribe((res)=>{
      if(res){
        console.log(res);
        this.singlelicenses = res;
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
}
