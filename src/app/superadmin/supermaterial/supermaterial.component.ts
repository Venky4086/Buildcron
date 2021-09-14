import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';

@Component({
  selector: 'app-supermaterial',
  templateUrl: './supermaterial.component.html',
  styleUrls: ['./supermaterial.component.css']
})
export class SupermaterialComponent {
  submitted = false;
  updatesubmitted = false;
  closeResult = '';
  materiallists: any;
  material_id:any;
  constructor(private fb:FormBuilder,private modalService: NgbModal,private toaster:ToastrService,private superadminservice:SuperadminService, private spinner:NgxSpinnerService) { }
   AddMaterial = this.fb.group({
     date:['', Validators.required],
     name:['', Validators.required],
     uom_no:['', Validators.required],
     status:['', Validators.required],
     description:['', Validators.required]
   })
   UpdateMaterial = this.fb.group({
    date:['', Validators.required],
    name:['', Validators.required],
    uom_no:['', Validators.required],
    status:['', Validators.required],
    description:['', Validators.required]
  })
   ngOnInit(){
   this.allmateriallist();
   }
   get f(){
     return this.AddMaterial.controls
   }
   get u(){
    return this.UpdateMaterial.controls
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

// list material

allmateriallist(){
  this.spinner.show()
  this.superadminservice.allmaterial().subscribe((res)=>{
    if(res){
      console.log(res);
      this.materiallists = res;
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

// Add Material

Add(){
  const mint = this
  this.submitted = true
  if(this.AddMaterial.invalid){
    return 
  }
  else{
    const formData = new FormData
    formData.append('date',this.AddMaterial.value.date);
    formData.append('name',this.AddMaterial.value.name);
    formData.append('uom_no',this.AddMaterial.value.uom_no);
    formData.append('status',this.AddMaterial.value.status);
    formData.append('description',this.AddMaterial.value.description);
    this.superadminservice.Addmaterial(formData).subscribe((res)=>{
      console.log(res);
      mint.toaster.success(res.message);
    },(error)=>{
      console.error(error.message);
    })
  }
}

// update

Update(){
  const mint = this
  this.updatesubmitted = true;
  if(this.UpdateMaterial.invalid){
    return
  }
  else{
    const formData = new FormData
    formData.append('date',this.AddMaterial.value.date);
    formData.append('name',this.AddMaterial.value.name);
    formData.append('uom_no',this.AddMaterial.value.uom_no);
    formData.append('status',this.AddMaterial.value.status);
    formData.append('description',this.AddMaterial.value.description);
    this.superadminservice.updatematerial(this.material_id,formData).subscribe((res)=>{
      console.log(res);
      mint.toaster.success(res.message);
    },(error)=>{
      console.error(error.message);
    })
  }
}

}
