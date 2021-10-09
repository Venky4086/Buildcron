import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SuperadminService } from '../services/superadmin.service';

@Component({
  selector: 'app-cfaqs',
  templateUrl: './cfaqs.component.html',
  styleUrls: ['./cfaqs.component.css']
})
export class CfaqsComponent implements OnInit {
  FaqsLists: any;

  constructor(private superadmin:SuperadminService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  this.allfaqs();
  }
  allfaqs(){
    this.spinner.show();
    this.superadmin.allfaqs().subscribe((Res)=>{
        console.log(Res);
        this.FaqsLists = Res;
        this.spinner.hide();
    },(error)=>{
      console.error(error);
      this.spinner.hide();
    });
  }
}
