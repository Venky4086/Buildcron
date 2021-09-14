import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-quality-inspection',
  templateUrl: './quality-inspection.component.html',
  styleUrls: ['./quality-inspection.component.css']
})


export class QualityInspectionComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  quality_id:any;
  Qualitylist:any;
  constructor(private adminservice:AdminService,private modalService: NgbModal,private fb:FormBuilder,private spinner:NgxSpinnerService,private toaster:ToastrService) { }

  AddQualityInspection = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    description:['', Validators.required],
    // id:['', Validators.required],
    uploaded:['', Validators.required],
    project_assigned:['', Validators.required],
  });
  UpdateQualityInspection = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    description:['', Validators.required],
    // id:['', Validators.required],
    uploaded:['', Validators.required],
    project_assigned:['', Validators.required],
  });
  ngOnInit(): void {
  this.QualityInspectionlist();
  }
  get f(){
    return this.AddQualityInspection.controls
  }
  get u(){
    return this.UpdateQualityInspection.controls
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

  // QualityInspection list

  QualityInspectionlist(){
     this.spinner.show();
     this.adminservice.QualityInspectionlist().subscribe((res)=>{
         if(res){
           console.log(res);
           this.Qualitylist = res;
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
   this.submitted = true;
   if(this.AddQualityInspection.invalid){
     return
   }
   else{
     const mint = this
     console.log(this.AddQualityInspection.value);
     const formData = new FormData;
     formData.append('date',this.AddQualityInspection.value.date);
     formData.append('name',this.AddQualityInspection.value.name);
     formData.append('description',this.AddQualityInspection.value.description);
     formData.append('uploaded',this.AddQualityInspection.value.uploaded);
     formData.append('project_assigned',this.AddQualityInspection.value.project_assigned);
     this.adminservice.AddQualityInspection(formData).subscribe((res)=>{
       console.log(res);
       mint.toaster.success(res.message);
     },(error)=>{
       console.error(error);
       mint.toaster.success(error.error.message);
     })
   }
  }

  // Update

  Update(){
  this.updatesubmitted = true;
  if(this.UpdateQualityInspection.invalid){
    return
  }
  else{
    const mint = this
    console.log(this.UpdateQualityInspection.value);
    const formData = new FormData;
    formData.append('date',this.UpdateQualityInspection.value.date);
    formData.append('name',this.UpdateQualityInspection.value.name);
    formData.append('description',this.UpdateQualityInspection.value.description);
    formData.append('uploaded',this.UpdateQualityInspection.value.uploaded);
    formData.append('project_assigned',this.UpdateQualityInspection.value.project_assigned);
    this.adminservice.UpdateQualityInspection(this.quality_id,formData).subscribe((res)=>{
      console.log(res);
      mint.toaster.success(res.message);
    },(error)=>{
      console.error(error);
      mint.toaster.success(error.error.message);
    })
  }

  }

  // Delete

  Delete(){
   
  }

}