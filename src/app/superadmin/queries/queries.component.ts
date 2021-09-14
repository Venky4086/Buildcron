import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { SuperadminService } from 'src/app/services/superadmin.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent  {

  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  queries:any;
  querie_id:any;
  constructor(private toaster:ToastrService,private spinner:NgxSpinnerService,private modalService: NgbModal,private fb:FormBuilder,private superadminservice:SuperadminService) { }
  AddQueries = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    phase:['', Validators.required],
    id:['', Validators.required],
    location:['', Validators.required],
    type:['', Validators.required],
    approver:['', Validators.required]
  })
  UpdateQueries = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    phase:['', Validators.required],
    id:['', Validators.required],
    location:['', Validators.required],
    type:['', Validators.required],
    approver:['', Validators.required]
  })
  ngOnInit() {
    this.allqueries();
  }
  get f(){
    return this.AddQueries.controls
  }
  get u(){
    return this.UpdateQueries.controls
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

  // all queries

  allqueries(){
    this.spinner.show();
    this.superadminservice.allqueries().subscribe((res)=>{
        if(res){
         console.log(res);
         this.queries = res;
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

  // Add

  Add(){
    const mint = this
    this.submitted = true;
    if(this.AddQueries.invalid){
      return
    }
    else{
      const formData = new FormData;
      formData.append('date',this.AddQueries.value.date);
      formData.append('name',this.AddQueries.value.name);
      formData.append('phase',this.AddQueries.value.phase);
      formData.append('id',this.AddQueries.value.id);
      formData.append('location',this.AddQueries.value.location);
      formData.append('type',this.AddQueries.value.type);
      formData.append('approver',this.AddQueries.value.approver);
      this.superadminservice.Addlicense(formData).subscribe((res)=>{
        console.log(res);
        mint.toaster.success(res.message);
      },(error)=>{
        console.error(error);
        mint.toaster.error(error.error.message)
      })
    }
  }

  // Update

  Update(){
    const mint = this
     this.updatesubmitted = true;
     if(this.UpdateQueries.invalid){
       return
     }
     else{
       console.log(this.UpdateQueries.value);
       const formData = new FormData;
       formData.append('date',this.AddQueries.value.date);
       formData.append('name',this.AddQueries.value.name);
       formData.append('phase',this.AddQueries.value.phase);
       formData.append('id',this.AddQueries.value.id);
       formData.append('location',this.AddQueries.value.location);
       formData.append('type',this.AddQueries.value.type);
       formData.append('approver',this.AddQueries.value.approver);
       this.superadminservice.updatequerie(this.querie_id,formData).subscribe((res)=>{
        console.log(res);
         mint.toaster.success(res.message);
       },(error)=>{
         console.error(error);
         mint.toaster.error(error.error.message);
       })
     }
  }
 
// Delete

 Delete(){
   const mint = this
   this.superadminservice.deletequerie(this.querie_id).subscribe((res)=>{
     console.log(res);
     mint.toaster.success(res.message);
   },(error)=>{
     console.error(error);
     mint.toaster.error(error.errro.message);
   })
 }

}
