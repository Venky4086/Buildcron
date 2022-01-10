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
  styleUrls: ['./projects.component.css'],
  providers:[AdminService]
})
export class ProjectsComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  project_id:any;
  projectlist:any;
  employelist: any;
  selectedItems:any[] = [];
  selectedmaterial:any[]=[];
  dropdownSettings:IDropdownSettings = {};
  MaterialdropdownSettings:IDropdownSettings = {};
  employe_name: any;
  employee_id: any;
  dropdownList:any[]=[];
  Material_List:any[]=[];
  Approver:any;
  EmployeeList: any;
  MaterialList:any;
  projectname: any;
  location: any;
  approver: any;
  empseleted: any;
  first_name: any;
  email: any;
  mobile: any;
  vendorlist: any;
  Materiallists: any;
  vendor_name: any;
  totalRecords:any;
  page:any=1;
  count:any = 5;
  client_id: any;
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
    this.allmateriallist()
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    this.MaterialdropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    this.allvendors();
  }
  get f(){
    return this.AddProject.controls
  }
  get u(){
    return this.UpdateProject.controls
  }

// all empoyess

  allemploys(){
    this.client_id = sessionStorage.getItem('client_id');
    let tmp:any[] = [];
    this.adminservice.Employeslist(this.client_id).subscribe((res)=>{
      if(res){
        console.log(res);
        this.employelist = res;
        for(let i=0; i < this.employelist.length; i++) {
          tmp.push({ item_id: this.employelist[i].employeeId, item_text: this.employelist[i].employee_name });
        }
        this.dropdownList = tmp;
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error.error.message);
      // this.spinner.hide();
    })
  }

  allmateriallist(){
    // this.spinner.show();
    this.client_id = sessionStorage.getItem('client_id');
    let tmp:any[] = [];
    this.adminservice.Materialslist(this.client_id).subscribe((res)=>{
      if(res){
        // this.spinner.hide();
        console.log(res);
        this.Materiallists = res;
        for(let i=0; i < this.Materiallists.length; i++) {
          tmp.push({ item_id: this.Materiallists[i].materialId, item_text: this.Materiallists[i].material_name});
        }
        this.Material_List = tmp;
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error);
      // this.spinner.hide();
    })
  }

// all vendros

  allvendors(){
    // this.spinner.show();
    this.client_id = sessionStorage.getItem('client_id');
    this.adminservice.vendorslist(this.client_id).subscribe((res)=>{
      if(res){
        console.log(res);
        this.vendorlist = res;
        // this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.error(error.error.message);
      // this.spinner.hide();
    })
  }

  // listprojects

  allprojects(){
    this.client_id = sessionStorage.getItem('client_id');
    this.spinner.show();
    this.adminservice.Projectslist(this.client_id).subscribe((res)=>{
      if(res){
        console.log(res);
        this.projectlist = res;
        this.totalRecords = res.length
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
    this.client_id = sessionStorage.getItem('client_id');
    const mint = this
    this.submitted = true;
    if(this.AddProject.invalid){
      return
    }
    else{
    let arr1:any[] = []
    console.log(this.selectedItems);
    for(let i=0; i < this.selectedItems.length; i++) {
      arr1.push(this.selectedItems[i].item_id);
    }
    this.EmployeeList = arr1.toString();
    let arr2:any[] = []
    console.log(this.selectedmaterial);
    for(let i=0; i < this.selectedmaterial.length; i++) {
      arr2.push(this.selectedmaterial[i].item_id);
    }
    this.MaterialList = arr2.toString();
    const data = {
      "project_name": this.AddProject.value.name,
      "city": this.AddProject.value.location,
      // "approver": this.Approver,
      // "assigned_employee":this.EmployeeList,
      // "assigned_material": this.MaterialList   
    }
      console.log(data);
      this.adminservice.AddProject(this.client_id,data).subscribe((res)=>{
        console.log(res);
        mint.toaster.success('Successfully projects done!');
        this.submitted = false;
        this.AddProject.reset();
        this.allprojects();
        $('#AddProject').hide();
      },(error)=>{
        console.error(error);
        this.submitted = false;
        this.AddProject.reset();
        if(error.error.message){
        mint.toaster.error(error.error.message);
        }
        else{
        mint.toaster.error('Somthing went wrong!');
        }
        $('#AddProject').hide();
      });
    }
  }

  edit(project_id:any,name:any,location:any,approver:any){
    this.project_id = project_id
    this.projectname = name,
    this.location = location
    // this.empseleted = empId;
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
    let arr2:any[] = []
    console.log(this.selectedmaterial);
    for(let i=0; i < this.selectedmaterial.length; i++) {
      arr2.push(this.selectedmaterial[i].item_id);
    }
    this.MaterialList = arr2;
      const data = {
        "name": this.UpdateProject.value.name,
        "location": this.UpdateProject.value.location,
        "approver": approver,
        "employee":this.EmployeeList ,
        "material":this.MaterialList      
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
    this.client_id = sessionStorage.getItem('client_id');
    this.adminservice.DeleteProject(this.project_id,this.client_id).subscribe((res)=>{
      console.log(res);
      mint.toaster.success('Successfully projects deleted!');
      this.allprojects();
      $('#DeleteProject').hide();
    },(error)=>{
      console.error(error);
      if(error.error.message){
        mint.toaster.error(error.error.message);
      }
      else{
        mint.toaster.error('Somthing went wrong!');
      }
      $('#DeleteProject').hide();
    })
  }

  employedetails(employe_id:any){
    this.adminservice.SingleEmployee(employe_id).subscribe((res)=>{
      console.log(res);
      this.first_name = res.first_name
      this.email = res.email,
      this.mobile = res.phone_number
    $('#EmployeeView').modal('show');
    },(error)=>{
      console.error(error);
     this.toaster.error('Somthing went to wrong!')
    })
  }
  materialdetails(material_id:any){
    this.adminservice.SingleMaterial(material_id).subscribe((res)=>{
      console.log(res);
     this.vendor_name = res.maker.name
    $('#VendorView').modal('show');
    },(error)=>{
      console.error(error);
    this.toaster.error('Somthing went to wrong!')
    })
  }
  empclose(){
    $('#EmployeeView').modal('hide');
  }
  vendorclose(){
    $('#VendorView').modal('hide');
  }
}