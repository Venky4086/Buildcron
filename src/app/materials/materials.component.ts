import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})


export class MaterialsComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  material_id: any;
  Materiallists: any;
  constructor(private adminservice: AdminService, private modalService: NgbModal, private fb: FormBuilder, private spinner: NgxSpinnerService, private toaster: ToastrService) { }
  AddMaterial = this.fb.group({
    date: ['', Validators.required],
    id: ['', Validators.required],
    description: ['', Validators.required],
    boq_ref: ['', Validators.required],
    make: ['', Validators.required],
    project_assigned: ['', Validators.required],
    total_uom: ['', Validators.required],
    total_quantity: ['', Validators.required],
    baseline_uom: ['', Validators.required],
    baseline_quantity: ['', Validators.required],
  });
  UpdateMaterial = this.fb.group({
    date: ['', Validators.required],
    id: ['', Validators.required],
    description: ['', Validators.required],
    boq_ref: ['', Validators.required],
    make: ['', Validators.required],
    project_assigned: ['', Validators.required],
    total_uom: ['', Validators.required],
    total_quantity: ['', Validators.required],
    baseline_uom: ['', Validators.required],
    baseline_quantity: ['', Validators.required],
  });
  get f() {
    return this.AddMaterial.controls
  }
  get u() {
    return this.UpdateMaterial.controls
  }
  ngOnInit() {
  this.allmateriallist();
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

// allmateriallist

  allmateriallist(){
      this.spinner.show();
      this.adminservice.Materialslist().subscribe((res)=>{
        if(res){
          this.spinner.hide();
          console.log(res);
          this.Materiallists = res;
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

  Add() {
    this.submitted = true;
    if (this.AddMaterial.invalid) {
      return
    }
    else {
      const mint = this
      console.log(this.AddMaterial.value);
      const formData = new FormData;
      formData.append('date', this.AddMaterial.value.date);
      formData.append('id', this.AddMaterial.value.id);
      formData.append('description', this.AddMaterial.value.description);
      formData.append('project_assigned', this.AddMaterial.value.project_assigned);
      formData.append('boq_ref', this.AddMaterial.value.boq_ref);
      formData.append('total_uom', this.AddMaterial.value.total_uom);
      formData.append('total_quantity', this.AddMaterial.value.total_quantity);
      formData.append('baseline_uom', this.AddMaterial.value.baseline_uom);
      formData.append('baseline_quantity', this.AddMaterial.value.baseline_quantity);
      this.adminservice.AddMaterial(formData).subscribe((res) => {
        console.log(res);
        mint.toaster.success(res.message);
      }, (error) => {
        console.error(error.eroror.message);
        mint.toaster.error(error.message);
      })
    }
  }

  // update

  Update() {
    this.updatesubmitted = true;
    if (this.AddMaterial.invalid) {
      return
    }
    else {
      const mint = this
      console.log(this.UpdateMaterial.value);
      const formData = new FormData;
      formData.append('date', this.UpdateMaterial.value.date);
      formData.append('id', this.UpdateMaterial.value.id);
      formData.append('description', this.UpdateMaterial.value.description);
      formData.append('boq_ref', this.UpdateMaterial.value.boq_ref);
      formData.append('project_assigned', this.UpdateMaterial.value.project_assigned);
      formData.append('total_uom', this.UpdateMaterial.value.total_uom);
      formData.append('total_quantity', this.UpdateMaterial.value.total_quantity);
      formData.append('baseline_uom', this.UpdateMaterial.value.baseline_uom);
      formData.append('baseline_quantity', this.UpdateMaterial.value.baseline_quantity);
      this.adminservice.UpdateMaterial(this.material_id, formData).subscribe((res) => {
        console.log(res);
        mint.toaster.success(res.message);
      }, (error) => {
        console.error(error.eroror.message);
        mint.toaster.error(error.message);
      })
    }
  }

  // delete

  Delete() {
    const mint = this
    this.adminservice.DeleteMaterial(this.material_id).subscribe((res) => {
      console.log(res);
      mint.toaster.success(res.message);
    }, (error) => {
      console.error(error);
      mint.toaster.error(error.error.message);
    })
  }

}