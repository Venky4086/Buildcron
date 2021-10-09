import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperadminService } from 'src/app/services/superadmin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css'],
  providers: [DatePipe,SuperadminService]
})
export class RegistrationsComponent  {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  companyregistrationdatas: any;
  company_id:any;
  company_name: any;
  phone: any;
  email: any;
  gstn: any;
  address: any;
  city: any;
  state: any;
  pincode: any;
  status: any;
  start_date: any;
  end_date: any;
  no_of_license: any;
  contact_person: any;
  file: any;
  filestatus:any;
  message:any;
  filesize:any;
  filename: any;
  date:any;
  userlists: any;
  contactperson: any;
  user_id: any;
  user_name: any;
  totalRecords:any;
  page:any=1;
  constructor(private datePipe: DatePipe,private toastr: ToastrService,private spinner: NgxSpinnerService,private modalService: NgbModal,private fb:FormBuilder,private superadminserivce:SuperadminService) { }
  CompanyRegistration = this.fb.group({
    name:['', Validators.required],
    countryCode:['', Validators.required],
    phone:['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email:['', [Validators.required,Validators.email]],
    username:['', [Validators.required]],
    password:['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    gstno:['', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")]],
    address:['', Validators.required],
    city:['', Validators.required],
    state:['', Validators.required],
    pincode:['', [Validators.required,Validators.pattern("[0-9]{6}$"),Validators.maxLength(6)]],
    // startdate:['', Validators.required],
    // enddate:['', Validators.required],
    nooflicense:['', Validators.required],
    // contactperson:['', Validators.required],
  });  
  UpdateCompanyRegistration = this.fb.group({
    name:['', Validators.required],
    // phone:['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    // email:['', [Validators.required,Validators.email]],
    gstno:['', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")]],
    address:['', Validators.required],
    city:['', Validators.required],
    state:['', Validators.required],
    pincode:['', [Validators.required,Validators.pattern("[0-9]{6}$"),Validators.maxLength(6)]],
    status:['', Validators.required],
    // startdate:['', Validators.required],
    // enddate:['', Validators.required],
    nooflicense:['', Validators.required],
    // contactperson:['', Validators.required],
  })

  ngOnInit() {
  this.allcompanydetails();
  // this.userlist();
  }

  get f(){
    return this.CompanyRegistration.controls
  }
  get u(){
    return this.UpdateCompanyRegistration.controls
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  userlist(){
    this.superadminserivce.userlist().subscribe((res)=>{
     console.log(res);
     this.userlists = res;
    },(error)=>{
      console.error(error);
    })
  }

  // images

  onFileSelect(event:any) {
    console.log(event);
    if (event.target.files.length > 0) {
       this.file = event.target.files[0];
      console.log(this.file.name);
      // reader.readAsDataURL(file);
      this.filestatus = true;
      this.filename = this.file.name;
      this.filesize = this.file.size;
      if (this.filesize > 2097152) {
        this.filestatus = false;
        this.toastr.error(this.message, 'File size should not be larger than 2 mb', {
          positionClass: 'toast-top-center'
        });
      }
      else {
        this.filestatus = true;
      }
    }
  }

  // all company details

  allcompanydetails(){
    this.spinner.show();
    this.superadminserivce.allcompanyregistrationdata().subscribe((res)=>{
      if(res){
        console.log(res);
        this.companyregistrationdatas = res;
        this.totalRecords = res.length;
        this.contactperson = res.contact_person;
        // console.log(this.contactperson);
        this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error)
    })
  }

  // end date

  enddate(e_date:any){
    console.log(e_date);
    this.date = new Date(e_date);
    this.end_date = this.datePipe.transform(this.date,'YYYY-MM-dd');
    console.log(this.end_date);
  }

  // add company details

  Submit(){
    const mint = this
    this.submitted = true;
    if(this.CompanyRegistration.invalid){
      return;
    }
    else{
      // const user = {
      // username:this.CompanyRegistration.value.username,
      // email:this.CompanyRegistration.value.email,
      // password:this.CompanyRegistration.value.password,
      // phone:this.CompanyRegistration.value.phone,
      // }
      // const address = {
      //   state:this.CompanyRegistration.value.state,
      //   city:this.CompanyRegistration.value.city,
      //   other_info:this.CompanyRegistration.value.address,
      //   pincode:this.CompanyRegistration.value.pincode 
      // }
      // this.spinner.show();
      const data = {
        "user":{"email":this.CompanyRegistration.value.email,"phone_number":this.CompanyRegistration.value.countryCode+this.CompanyRegistration.value.phone,
        "first_name":this.CompanyRegistration.value.username,"password":this.CompanyRegistration.value.password},
        "gstin":this.CompanyRegistration.value.gstno,
        "name":this.CompanyRegistration.value.name,
        // "published_date":this.CompanyRegistration.value.startdate,
        // 'end_at':this.end_date,
        // "contact_person":this.CompanyRegistration.value.contactperson,
        "state":this.CompanyRegistration.value.state,"city":this.CompanyRegistration.value.city,
        "pincode":this.CompanyRegistration.value.pincode,"addres":this.CompanyRegistration.value.address,
        "license_purchased":this.CompanyRegistration.value.nooflicense
      }
      console.log(data);
      const formData = new FormData
      formData.append('name', this.CompanyRegistration.value.name);
      formData.append('phone', this.CompanyRegistration.value.phone);
      formData.append('email', this.CompanyRegistration.value.email);
      formData.append('gstin', this.CompanyRegistration.value.gstno);
      formData.append('other_info', this.CompanyRegistration.value.address);
      formData.append('city', this.CompanyRegistration.value.city);
      formData.append('state', this.CompanyRegistration.value.state);
      formData.append('pincode', this.CompanyRegistration.value.pincode);
      formData.append('published_date', this.CompanyRegistration.value.startdate);
      formData.append('end_at', this.end_date);
      // formData.append('no_licenses', this.CompanyRegistration.value.nooflicense);
      formData.append('contact_person', this.CompanyRegistration.value.contactperson);
      console.log(formData);
      this.superadminserivce.companyregistration(data).subscribe((res)=>{
        console.log(res);
        // this.spinner.hide(); 
        mint.toastr.success('Sucessfully registration done!');
        this.allcompanydetails();
        this.CompanyRegistration.reset();
        this.submitted =false;
        $('#Addcompany').hide();
      },(error)=>{
        console.error(error);
        // this.spinner.hide(); 
        mint.toastr.error('Somthing went wrong');
        // this.getDismissReason;
        this.CompanyRegistration.reset();
        this.submitted =false;
        $('#Addcompany').hide();
      })
    }
  }

// view company details

  Details(id:any,company_name:any,phone:any,email:any,gstn:any,address:any,city:any,state:any,pincode:any,status:any,no_of_license:any) {
    this.company_id = id;
    this.company_name = company_name;
    this.phone = phone;
    this.email = email;
    this.gstn = gstn;
    this.address = address;
    this.city = city;
    this.state = state;
    this.pincode = pincode;
    this.status = status;
    // this.start_date = start_date;
    // this.end_date = end_date;
    this.no_of_license = no_of_license;
    // this.contact_person = contact_person; 
  }

//  update company details 

  edit(id:any,company_name:any,user_id:any,user_name:any,phone:any,email:any,gstn:any,address:any,city:any,state:any,pincode:any,status:any,no_of_license:any) {
    this.company_id = id;
    this.company_name = company_name;
    this.user_id = user_id;
    this.user_name = user_name;
    this.phone = phone;
    this.email = email;
    this.gstn = gstn;
    this.address = address;
    this.city = city;
    this.state = state;
    this.pincode = pincode;
    this.status = status;
    // this.start_date = start_date;
    // this.end_date = end_date;
    this.no_of_license = no_of_license;
    // this.contact_person = contact_person; 
  }
  Update(){
    const mint = this
    this.updatesubmitted = true;
    if(this.UpdateCompanyRegistration.invalid){
      return
    }
    else{
      const data = {
        // "user":{
        //   "id":this.user_id,
        //   "email":this.UpdateCompanyRegistration.value.email,
        //   "phone_number":this.UpdateCompanyRegistration.value.phone,
        // },
        "gstin":this.UpdateCompanyRegistration.value.gstno,
        "name":this.UpdateCompanyRegistration.value.name,
        // "published_date":this.UpdateCompanyRegistration.value.startdate,
        // 'end_at':this.end_date,
        // "contact_person":this.UpdateCompanyRegistration.value.contactperson,
        "state":this.UpdateCompanyRegistration.value.state,"city":this.UpdateCompanyRegistration.value.city,
        "pincode":this.UpdateCompanyRegistration.value.pincode,"addres":this.UpdateCompanyRegistration.value.address ,
        "license_purchased":this.UpdateCompanyRegistration.value.nooflicense
      }

      // this.spinner.show();
      // const formData = new FormData
      // formData.append('name', this.UpdateCompanyRegistration.value.name);
      // formData.append('phone', this.UpdateCompanyRegistration.value.phone)
      // formData.append('email', this.UpdateCompanyRegistration.value.email);
      // formData.append('user',this.user_id);
      // formData.append('gstin', this.UpdateCompanyRegistration.value.gstno);
      // formData.append('addres', this.UpdateCompanyRegistration.value.address);
      // formData.append('city', this.UpdateCompanyRegistration.value.city);
      // formData.append('state', this.UpdateCompanyRegistration.value.state);
      // formData.append('pincode', this.UpdateCompanyRegistration.value.pincode);
      // formData.append('status', this.UpdateCompanyRegistration.value.status);
      // formData.append('published_date', this.UpdateCompanyRegistration.value.startdate);
      // formData.append('end_at', this.end_date);
      // formData.append('no_licenses', this.UpdateCompanyRegistration.value.nooflicense);
      // formData.append('contact_person', this.UpdateCompanyRegistration.value.contactperson);
      console.log(this.UpdateCompanyRegistration.value);
      this.superadminserivce.updatecompanyregistrationdata(this.company_id,data).subscribe((res)=>{
        console.log(res);
        // this.spinner.hide(); 
        mint.toastr.success('Successfully Updated!');
        $('#Updatecompany').hide();
        this.allcompanydetails();
      },(error)=>{
        console.log(error);
        // this.spinner.hide(); 
        mint.toastr.error('Somthing went wrong');
        $('#Updatecompany').hide();
      })
    }
  }
  
  // delete company details

  delete(id:any){
    this.company_id = id;
    console.log(this.company_id);
  }
  Delete(){
    const mint = this
    this.superadminserivce.deletecompanyregistrationdata(this.company_id).subscribe((res)=>{
      console.log(res);
     mint.toastr.success('Successfully Deleted!');
     this.allcompanydetails();
     $('#Deletecompany').hide();
    },(error)=>{
      console.error(error);
      mint.toastr.error('Somthing went wrong');
     $('#Deletecompany').hide();
    })
  }
}
