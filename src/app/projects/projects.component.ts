import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

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
  constructor(private adminservice:AdminService,private modalService: NgbModal,private fb:FormBuilder,private spinner:NgxSpinnerService,private toaster:ToastrService) { }
  AddProject = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    phase:['', Validators.required],
    // id:['', Validators.required],
    location:['', Validators.required],
    type:['', Validators.required],
    approver:['', Validators.required]
  })
  UpdateProject = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    phase:['', Validators.required],
    // id:['', Validators.required],
    location:['', Validators.required],
    type:['', Validators.required],
    approver:['', Validators.required]
  })
  ngOnInit(){
    this.allprojects();
  }
  get f(){
    return this.AddProject.controls
  }
  get u(){
    return this.AddProject.controls
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

  // Add

  Add(){
    const mint = this
    this.submitted = true;
    if(this.AddProject.invalid){
      return
    }
    else{
      console.log(this.AddProject.value);
      const formData = new FormData;
      formData.append('date',this.AddProject.value.date);
      formData.append('name',this.AddProject.value.name);
      formData.append('phase',this.AddProject.value.phase);
      // formData.append('id',this.AddProject.value.id);
      formData.append('location',this.AddProject.value.location);
      formData.append('type',this.AddProject.value.type);
      formData.append('location',this.AddProject.value.approver);
      console.log(formData);
      this.adminservice.AddProject(formData).subscribe((res)=>{
        console.log(res);
        mint.toaster.success(res.message);
      },(error)=>{
        console.error(error);
        mint.toaster.error(error.error.message);
      });
    }
  }

//  Update

  Update(){
    const mint = this
  this.updatesubmitted = true;
    if(this.UpdateProject.invalid){
      return
    }
    else{
      console.log(this.UpdateProject.value);
      const formData = new FormData;
      formData.append('date',this.UpdateProject.value.date);
      formData.append('name',this.UpdateProject.value.name);
      formData.append('phase',this.UpdateProject.value.phase);
      // formData.append('id',this.UpdateProject.value.id);
      formData.append('location',this.UpdateProject.value.location);
      formData.append('type',this.UpdateProject.value.type);
      formData.append('location',this.UpdateProject.value.approver);
      console.log(formData);
      this.adminservice.UpdateProject(this.project_id,formData).subscribe((res)=>{
        console.log(res);
        mint.toaster.success(res.message);
      },(error)=>{
        console.error(error);
        mint.toaster.error(error.error.message);
      });
    }
  }
 
  // Delete

  Delete(){
    const mint = this
    this.adminservice.DeleteProject(this.project_id).subscribe((res)=>{
      console.log(res);
      mint.toaster.success(res.message)
    },(error)=>{
      console.error(error);
      mint.toaster.error(error)
    })
  }

}