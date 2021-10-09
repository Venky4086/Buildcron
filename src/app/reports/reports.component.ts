import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private adminservice:AdminService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.allreports();
  }
  
  allreports(){
    this.spinner.show();
    this.adminservice.allreports().subscribe((res)=>{
      if(res){
        console.log(res);
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error);
    });
  }

}
