import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';
declare var $:any;
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  Contactlist: any;
  Contact_id: any;
  Contact_name: any;
  Contact_email: any;
  Contact_phone: any;
  Contact_address: any;

constructor(private superadminservice:SuperadminService,private spinner:NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.allcontactlsit();
  }

// all contacts

allcontactlsit(){
  this.spinner.show();
  this.superadminservice.all_contacts().subscribe((res)=>{
    console.log(res);
    this.spinner.hide();
    this.Contactlist = res;
  },(error)=>{
    console.error(error);
    this.spinner.hide();
  })
}

// view contacts

view(contact_id:any,contact_name:any,contact_email:any,contact_phone:any,contact_address:any){
   this.Contact_id = contact_id,
   this.Contact_name = contact_name,
   this.Contact_email = contact_email,
   this.Contact_phone = contact_phone,
   this.Contact_address = contact_address
}

// delete contacts

delete(Contact_id:any){
  this.Contact_id = Contact_id
}

Delete(){
  this.superadminservice.delete_contact(this.Contact_id).subscribe((res)=>{
    console.log(res);
     this.toastr.success('Successfully Contact Deleted!');
     this.allcontactlsit();
     $('#Deletebanner').hide();
   },(error)=>{
     console.error(error);
     this.toastr.error('Somthing went to wrong');
     $('#Deletebanner').hide();
   })
}

}
