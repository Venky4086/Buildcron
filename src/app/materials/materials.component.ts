import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
declare var $:any;
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
  vendorlist: any;
  material_name: any;
  descriprion: any;
  boq_ref: any;
  maker_name: any;
  total_uom: any;
  total_qty: any;
  b_uom: any;
  b_qty: any;
  maker_id: any;
  materialId: any;
  totalRecords:any;
  page:any=1;
  constructor(private adminservice: AdminService, private modalService: NgbModal, private fb: FormBuilder, private spinner: NgxSpinnerService, private toaster: ToastrService) { }
  AddMaterial = this.fb.group({
    name: ['', Validators.required],
    // id: ['', Validators.required],
    description: ['', Validators.required],
    boq_ref: ['', Validators.required],
    make: ['', Validators.required],
    // project_assigned: ['', Validators.required],
    total_uom: ['', Validators.required],
    total_quantity: ['', Validators.required],
    baseline_uom: ['', Validators.required],
    baseline_quantity: ['', Validators.required],
  });
  UpdateMaterial = this.fb.group({
    name: ['', Validators.required],
    // id: ['', Validators.required],
    description: ['', Validators.required],
    boq_ref: ['', Validators.required],
    make: ['', Validators.required],
    // project_assigned: ['', Validators.required],
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
  this.allvendors();
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

// vendor list 

allvendors(){
  this.spinner.show();
  this.adminservice.vendorslist().subscribe((res)=>{
    if(res){
      console.log(res);
      this.vendorlist = res;
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


// view material

view(material_name:any,materialId:any,description:any,boq_ref:any,maker_name:any,total_uom:any,total_qty:any,b_uom:any,b_qty:any){
$('#MaterialView').modal('show');
this.material_name = material_name,
this.materialId = materialId,
this.descriprion = description,
this.boq_ref = boq_ref,
this.maker_name = maker_name,
this.total_uom = total_uom,
this.total_qty = total_qty,
this.b_uom = b_uom,
this.b_qty = b_qty,
$('#MaterialView').modal('show');
}

matclose(){
  $('#MaterialView').modal('hide');
}

// allmateriallist

  allmateriallist(){
      this.spinner.show();
      this.adminservice.Materialslist().subscribe((res)=>{
        if(res){
          this.spinner.hide();
          console.log(res);
          this.Materiallists = res;
          this.totalRecords = res.length;
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
      const data = {
        "name": this.AddMaterial.value.name,
        "maker": +this.AddMaterial.value.make,
        "boq_ref": this.AddMaterial.value.boq_ref,
        "description": this.AddMaterial.value.description,
        "b_uom": this.AddMaterial.value.baseline_uom,
        "b_qty": this.AddMaterial.value.baseline_quantity,
        "total_uom": this.AddMaterial.value.total_uom,
        "total_qty": this.AddMaterial.value.total_quantity
      }
      // const formData = new FormData;
      // formData.append('date', this.AddMaterial.value.date);
      // formData.append('id', this.AddMaterial.value.id);
      // formData.append('description', this.AddMaterial.value.description);
      // formData.append('project_assigned', this.AddMaterial.value.project_assigned);
      // formData.append('boq_ref', this.AddMaterial.value.boq_ref);
      // formData.append('total_uom', this.AddMaterial.value.total_uom);
      // formData.append('total_quantity', this.AddMaterial.value.total_quantity);
      // formData.append('baseline_uom', this.AddMaterial.value.baseline_uom);
      // formData.append('baseline_quantity', this.AddMaterial.value.baseline_quantity);
      this.adminservice.AddMaterial(data).subscribe((res) => {
        console.log(res);
        this.allmateriallist();
        this.AddMaterial.reset();
        this.submitted = false;
        mint.toaster.success("Sucessfully Material Added!");
        $('#AddMaterial').hide();
      }, (error) => {
        console.error(error);
        this.AddMaterial.reset();
        this.submitted = false;
        mint.toaster.error('Somthing went to wrong!');
        $('#AddMaterial').hide();
      })
    }
  }

  // update

edit(material_id:any,material_name:any,materialId:any,description:any,boq_ref:any,maker_id:any,maker_name:any,total_uom:any,total_qty:any,b_uom:any,b_qty:any){
    // $('MaterialView').modal('show');
  this.material_id = material_id,
  this.material_name = material_name,
  this.materialId = materialId,
  this.descriprion = description,
  this.boq_ref = boq_ref,
  this.maker_id = maker_id,
  this.maker_name = maker_name,
  this.total_uom = total_uom,
  this.total_qty = total_qty,
  this.b_uom = b_uom,
  this.b_qty = b_qty
  // $('MaterialView').modal('show');
  }


  Update() {
    this.updatesubmitted = true;
    if (this.UpdateMaterial.invalid) {
      return
    }
    else {
      const mint = this
      console.log(this.UpdateMaterial.value);
      const data = {
        "name": this.UpdateMaterial.value.name,
        "maker": {
          "id":this.UpdateMaterial.value.make
        },
        "boq_ref": this.UpdateMaterial.value.boq_ref,
        "description": this.UpdateMaterial.value.description,
        "b_uom": this.UpdateMaterial.value.baseline_uom,
        "b_qty": this.UpdateMaterial.value.baseline_quantity,
        "total_uom": this.UpdateMaterial.value.total_uom,
        "total_qty": this.UpdateMaterial.value.total_quantity
      }
      // const formData = new FormData;
      // formData.append('date', this.UpdateMaterial.value.date);
      // formData.append('id', this.UpdateMaterial.value.id);
      // formData.append('description', this.UpdateMaterial.value.description);
      // formData.append('boq_ref', this.UpdateMaterial.value.boq_ref);
      // formData.append('project_assigned', this.UpdateMaterial.value.project_assigned);
      // formData.append('total_uom', this.UpdateMaterial.value.total_uom);
      // formData.append('total_quantity', this.UpdateMaterial.value.total_quantity);
      // formData.append('baseline_uom', this.UpdateMaterial.value.baseline_uom);
      // formData.append('baseline_quantity', this.UpdateMaterial.value.baseline_quantity);
      this.adminservice.UpdateMaterial(this.material_id, data).subscribe((res) => {
        console.log(res);
        mint.toaster.success("Sucessfully Material Updated!");
        $('#UpdateMaterial').hide();
        this.Materiallists();
      }, (error) => {
        console.error(error);
        mint.toaster.error('Somthing went to wrong!');
        $('#UpdateMaterial').hide();
      })
    }
  }

  // delete

delete(material_id:any){
  this.material_id = material_id
}

  Delete() {
    const mint = this
    this.adminservice.DeleteMaterial(this.material_id).subscribe((res) => {
      console.log(res);
      mint.toaster.success('Sucesfully deleted the material!');
      $('#DeleteMaterial').hide();
    }, (error) => {
      console.error(error);
      mint.toaster.error('Somthing went to wrong!');
      $('#DeleteMaterial').hide();
    })
  }



}