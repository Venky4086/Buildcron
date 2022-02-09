import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'inspector';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProjectsComponent } from '../projects/projects.component';
import { AdminService } from '../services/admin.service';
declare var $: any;
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers:[AdminService]
})
export class EmployeesComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  employe_id:any;
  employelist:any;
  projectlist: any;
  dropdownList:any[]=[];
  dropdownSettings:IDropdownSettings = {};
  selectedItems:any[] = [];
  ProjectList: any[] = [];
  name: any;
  email: any;
  mobile: any;
  emid: any;
  totalRecords:any;
  page:any=1;
  count: any = 5;
  license_id: any;
  client_id:any;
  selectedLicense:any;
  LicenseList:any;
  assigned_license: any;

  update_name: any;
  update_email: any;
  update_mobile: any;
  //
  taken_project= new Set();
  ClientProject:any[]=[];
  Project =new Set();
  assignproject = new Set<string>() ;
  constructor(private adminservice:AdminService,
              private modalService: NgbModal,
              private fb:FormBuilder,
              private spinner:NgxSpinnerService,
              private toaster:ToastrService,


              ) { }
  AddEmployee = this.fb.group({
    name:['', Validators.required],
    countrycode:['', Validators.required],
    email:['',[Validators.required,Validators.email]],
    license_id:['',Validators.required],
    mobile:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    status:['',Validators.required]
  });
  UpdateEmployee = this.fb.group({
    name:['', Validators.required],
    email:['',[Validators.required,Validators.email]],
    license_id:['',Validators.required],
    mobile:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
  });

  ngOnInit(){
    this.allemploys();
    this.alllicenses();
    this.allprojects()

  }
  get f(){
    return this.AddEmployee.controls
  }
  get u(){
    return this.UpdateEmployee.controls
  }
  //all
  // all license

  alllicenses(){
    this.client_id = sessionStorage.getItem('client_id');
    this.adminservice.ClientLicenselist(this.client_id).subscribe((res)=>{
      console.log(res);
      this.LicenseList = res.license_status;
    },(error)=>{
      console.error(error);
    });
  }

  // employe list

  allemploys(){
    this.client_id = sessionStorage.getItem('client_id');
    this.spinner.show();
    this.adminservice.Employeslist(this.client_id).subscribe((res)=>{
      if(res){
        console.log(res);
        this.employelist = res;
        this.totalRecords = res.length;
        this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error.error.message);
      this.spinner.hide();
    })
  }
//ALL PROJECT OF THIS CLIENT
  allprojects(){
    this.client_id = sessionStorage.getItem('client_id');
    this.spinner.show();
    this.adminservice.Projectslist(this.client_id).subscribe((res)=>{
      if(res){
        console.log(res);
        this.ClientProject = res;
        // this.totalRecords = res.length
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



  view(employe_id:any,name:any,email:any,mobile:any,assigned_license:any,assigned_project:any){
    this.emid = employe_id,
    this.name = name,
    this.email = email,
    this.mobile = mobile,
    this.assigned_license = assigned_license

  }

  // Add

  Add(){
    const mint = this
    this.submitted = true;
    if(this.AddEmployee.invalid){
      return
    }
    else{
      this.license_id = this.AddEmployee.value.license_id
      this.client_id = sessionStorage.getItem('client_id');
      const data = {
          "email": this.AddEmployee.value.email,
          "employee_name": this.AddEmployee.value.name,
          // "phone_number": this.AddEmployee.value.countrycode+this.AddEmployee.value.mobile,
          "phone_number": this.AddEmployee.value.mobile,
          "employee_status":this.AddEmployee.value.status
        }
        console.log(data);
      this.adminservice.AddEmploye(data,this.client_id,this.license_id).subscribe((res)=>{
        console.log(res)
        mint.toaster.success(res.message);
        $('#AddEmployee').hide();
        this.allemploys();
        this.AddEmployee.reset();
        this.submitted = false;
      },(error)=>{
        console.error(error);
        mint.toaster.error(error.error.message);
        this.AddEmployee.reset();
        this.submitted = false;
        $('#AddEmployee').hide();
      });
    }
  }

  // update

  edit(employe_id:any,name:any,email:any,mobile:any,assigned_license:any,assigned_project:any){
    this.employe_id = employe_id,
    this.update_name = name,
    this.update_email = email,
    this.update_mobile = mobile,
    this.assigned_license = assigned_license

  }

  Update(){
    const mint = this
    // this.updatesubmitted = true;
    // if(this.UpdateEmployee.invalid){
    //  console.log('invalid');
    //   return
    // }
    // else{
      const data = {
        "employee_name": this.UpdateEmployee.value.name,
        "email": this.UpdateEmployee.value.email,
        "phone_number": this.UpdateEmployee.value.mobile,
      }
      console.log("====")
      console.log(data)
      this.adminservice.UpdateEmploye(this.employe_id,data).subscribe((res)=>{
        console.log(res)
        mint.toaster.success('Successfully Employe Updated!');
        $('#UpdateEmployee').hide();
        this.allemploys();
      },(error)=>{
        console.error(error);
        if(error.error.message){
          mint.toaster.error(error.error.message);
        }
        else{
          mint.toaster.error('Somthing went to wrong');
        }
        $('#UpdateEmployee').hide();
      });
    // }
  }

// delete

  delete(employee_id:any){
    this.employe_id = employee_id
    console.log(this.employe_id)
  }

  Delete(){
    const mint = this
    this.client_id = sessionStorage.getItem('client_id');
    this.adminservice.DeleteEmploye(this.client_id,this.employe_id).subscribe((res)=>{
      console.log(res);
      mint.toaster.success('Successfully Employe Deleted!');
      $('#DeleteEmployee').hide();
      this.allemploys();
    },(error)=>{
      console.error(error);
      mint.toaster.error('Somthing went wrong');
      $('#DeleteEmployee').hide();
    })
  }


AssingProject(data:any){
  this.employe_id=data

  for (let emp of this.employelist){
    if (emp["employeeId"]===data)
      {

        console.log(emp["assigned_project"])
        for (let project of emp["assigned_project"]){
          this.taken_project.add(project)
          this.assignproject.add(project)

        }

        // break
      }


  }

}
AddProject(event:any){

  if (event.target.checked){

    this.taken_project.add(event.target.value)

    console.log(Array.from( this.taken_project).join(","))
  }
  else{
    this.taken_project.delete(event.target.value);

    console.log(Array.from( this.taken_project).join(","))
  }

}


EmployeeAssingOnProject(){
  this.client_id = sessionStorage.getItem('client_id');
  console.log(this.client_id)
  console.log(this.employe_id)
  console.log(Array.from( this.taken_project).join(","))
  const formData=new FormData();
  this.adminservice.Assigneed_Project_Employee(formData,this.client_id,
                                                this.employe_id,Array.from( this.taken_project).join(",")

                                              ).subscribe((res)=>{
                                                console.log(res)
                                                this.toaster.success(this.employe_id,res.message)
                                                this.allemploys();
                                              },
                                              (errors)=>{
                                                console.log(errors)
                                              }

                                              )


}


reset(){

}

}
