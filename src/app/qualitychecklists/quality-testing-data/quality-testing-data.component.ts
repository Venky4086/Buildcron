import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-quality-testing-data',
  templateUrl: './quality-testing-data.component.html',
  styleUrls: ['./quality-testing-data.component.css']
})
export class QualityTestingDataComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  Qualitylist: any;
  quality_id:any;
  constructor(private adminservice:AdminService,private modalService: NgbModal,private fb:FormBuilder,private spinner:NgxSpinnerService,private toaster:ToastrService) { }
  AddQualityTestData = this.fb.group({
      date:['', Validators.required],
      name:['', Validators.required],
      description:['', Validators.required],
      uploaded:['', Validators.required],
      project_assigned:['', Validators.required]
  });
  UpdateQualityTestData = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    description:['', Validators.required],
    uploaded:['', Validators.required],
    project_assigned:['', Validators.required]
  });
  ngOnInit(){
     this.allqualitylist();
  }
  get f(){
    return this.AddQualityTestData.controls
  }
  get u(){
    return this.UpdateQualityTestData.controls
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
  
  // all quality list

  allqualitylist(){
    this.spinner.show();
    this.adminservice.QualityTestingDatalist().subscribe((res)=>{
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
     const mint = this
     this.submitted = true;
     if(this.UpdateQualityTestData.invalid){
       return
     }
     else{
       const formDate = new FormData;
       formDate.append('date',this.AddQualityTestData.value.date);
       formDate.append('name',this.AddQualityTestData.value.name);
       formDate.append('description',this.AddQualityTestData.value.description);
       formDate.append('uploaded',this.AddQualityTestData.value.uploaded);
       formDate.append('project_assigned',this.AddQualityTestData.value.project_assigned);
       this.adminservice.AddQualityTestingData(formDate).subscribe((res)=>{
         console.log(res);
         mint.toaster.success(res.message);
       },(error)=>{
        console.log(error);
        mint.toaster.success(error.error.message);
       });
     }
  }

  // Update

  Update(){
    const mint = this
    this.updatesubmitted = true;
    if(this.UpdateQualityTestData.invalid){
      return
    }
    else{
      const formDate = new FormData;
      formDate.append('date',this.UpdateQualityTestData.value.date);
      formDate.append('name',this.UpdateQualityTestData.value.name);
      formDate.append('description',this.UpdateQualityTestData.value.description);
      formDate.append('uploaded',this.UpdateQualityTestData.value.uploaded);
      formDate.append('project_assigned',this.UpdateQualityTestData.value.project_assigned);
      this.adminservice.UpdateQualityTestingData(this.quality_id,formDate).subscribe((res)=>{
        console.log(res);
        mint.toaster.success(res.message);
      },(error)=>{
       console.log(error);
       mint.toaster.success(error.error.message);
      });
    }
 }

//  Delete

}