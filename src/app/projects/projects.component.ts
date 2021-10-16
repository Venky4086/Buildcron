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
  EmployeeList: any[]=[];
  MaterialList:any[]=[];
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
  count:any = 2;
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
    // this.spinner.show();
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

  allmateriallist(){
    // this.spinner.show();
    let tmp:any[] = [];
    this.adminservice.Materialslist().subscribe((res)=>{
      if(res){
        // this.spinner.hide();
        console.log(res);
        this.Materiallists = res;
        for(let i=0; i < this.Materiallists.length; i++) {
          tmp.push({ item_id: this.Materiallists[i].id, item_text: this.Materiallists[i].name });
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
    this.adminservice.vendorslist().subscribe((res)=>{
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
    this.spinner.show();
    this.adminservice.Projectslist().subscribe((res)=>{
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
    this.EmployeeList = arr1;
    let arr2:any[] = []
    console.log(this.selectedmaterial);
    for(let i=0; i < this.selectedmaterial.length; i++) {
      arr2.push(this.selectedmaterial[i].item_id);
    }
    this.MaterialList = arr2;
    const data = {
      "name": this.AddProject.value.name,
      "location": this.AddProject.value.location,
      "approver": this.Approver,
      "employee":this.EmployeeList,
      // "vendor": 
      "material": this.MaterialList   
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