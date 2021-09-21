import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare var $:any;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  project_id:any;
  projectlist:any;
  employelist: any;
  selectedItems:any[] = [];
  dropdownSettings:IDropdownSettings = {};
  employe_name: any;
  employee_id: any;
  dropdownList:any[]=[];
  Approver:any;
  EmployeeList: any[]=[];
  projectname: any;
  location: any;
  approver: any;
  empseleted: any;
  first_name: any;
  email: any;
  mobile: any;
  constructor(private adminservice:AdminService,private modalService: NgbModal,private fb:FormBuilder,private spinner:NgxSpinnerService,private toaster:ToastrService) { }
  AddProject = this.fb.group({
    // date:['', Validators.required],
    name:['', Validators.required],
    // phase:['', Validators.required],
    // id:['', Validators.required],
    location:['', Validators.required],
    // type:['', Validators.required],
    // approver:['', Validators.required]
  })
  UpdateProject = this.fb.group({
    // date:['', Validators.required],
    name:['', Validators.required],
    // phase:['', Validators.required],
    // id:['', Validators.required],
    location:['', Validators.required],
    // type:['', Validators.required],
    // approver:['',]
  })
  ngOnInit(){
    this.allprojects();
    this.allemploys();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }
  get f(){
    return this.AddProject.controls
  }
  get u(){
    return this.UpdateProject.controls
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

// all empoyess

  allemploys(){
    this.spinner.show();
    let tmp:any[] = [];
    this.adminservice.Employeslist().subscribe((res)=>{
      if(res){
        console.log(res);
        this.employelist = res;
        // this.empl
        for(let i=0; i < this.employelist.length; i++) {
          tmp.push({ item_id: this.employelist[i].id, item_text: this.employelist[i].user.first_name });
        }
        this.dropdownList = tmp;
      // for (let index = 0; index < this.employelist.length; index++) {
      //   this.employee_id = res[index].id
      //   this.employe_name = res[index].user.first_name;
      //   console.log(this.employe_name);
      // }
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

  // listprojects

  allprojects(){
    this.spinner.show();
    this.adminservice.Projectslist().subscribe((res)=>{
      if(res){
        console.log(res);
        this.projectlist = res;
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

  view(name:any,location:any,approver:any){
    this.projectname = name,
    this.location = location,
    this.Approver = approver
    // console.log(this.Approver);
  }

  // Add

  Add(){
    const mint = this
    this.submitted = true;
    if(this.AddProject.invalid){
      return
    }
    else{
    let arr1:any[] = []
    // console.log(this.selectedItems);
    for(let i=0; i < this.selectedItems.length; i++) {
      arr1.push(this.selectedItems[i].item_id);
    }
    this.EmployeeList = arr1;
    const data ={
      "name": this.AddProject.value.name,
      "location": this.AddProject.value.location,
      "approver": this.Approver,
      "employee":this.EmployeeList       
    }
      console.log(data);
      this.adminservice.AddProject(data).subscribe((res)=>{
        console.log(res);
        mint.toaster.success('Successfully projects done!');
        this.submitted = false;
        this.AddProject.reset();
        this.allprojects();
        $('#AddProject').hide();
      },(error)=>{
        console.error(error);
        mint.toaster.error('Somthing went wrong!');
        this.submitted = false;
        this.AddProject.reset();
        $('#AddProject').hide();
      });
    }
  }

  edit(project_id:any,name:any,location:any,approver:any,empId:any){
    this.project_id = project_id
    this.projectname = name,
    this.location = location,
    this.empseleted = empId;
    // console.log(this.empseleted)
  }

//  Update
  Update(approver:any){
    console.log(approver);
    const mint = this
    this.updatesubmitted = true;
    if(this.UpdateProject.invalid){
      return
    }
    else{
      let arr1:any[] = []
    // console.log(this.selectedItems);
    for(let i=0; i < this.selectedItems.length; i++) {
      arr1.push(this.selectedItems[i].item_id);
    }
    this.EmployeeList = arr1;
      const data = {
        "name": this.UpdateProject.value.name,
        "location": this.UpdateProject.value.location,
        "approver": approver,
        "employee":this.EmployeeList       
      }
      console.log(data);
      this.adminservice.UpdateProject(this.project_id,data).subscribe((res)=>{
        console.log(res);
        mint.toaster.success('Sucessfully project updated!');
        this.allprojects();
        $('#UpdateProject').hide();
      },(error)=>{
        console.error(error);
        mint.toaster.error('Somthing went wrong!');
        $('#UpdateProject').hide();
      });
    }
  }
 
  // Delete

  delete(project_id:any){
    this.project_id = project_id 
  }

  Delete(){
    const mint = this
    this.adminservice.DeleteProject(this.project_id).subscribe((res)=>{
      console.log(res);
      mint.toaster.success('Successfully projects deleted!');
      this.allprojects();
      $('#DeleteProject').hide();
    },(error)=>{
      console.error(error);
      mint.toaster.error(error);
      $('#DeleteProject').hide();
    })
  }
  employedetails(employe_id:any){
    $('#EmployeeView').modal('show');
    this.adminservice.SingleEmployee(employe_id).subscribe((res)=>{
      console.log(res);
      this.first_name = res.first_name
      this.email = res.email,
      this.mobile = res.phone_number
    $('#EmployeeView').modal('show');
    },(error)=>{
      console.error(error);
    })
  }
  empclose(){
    $('#EmployeeView').modal('hide');
  }
  
}