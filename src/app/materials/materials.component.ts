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
  count:any = 5;
  client_id: any;
  vendor_id: any;
  uom: any;
  constructor(private adminservice: AdminService, private modalService: NgbModal, private fb: FormBuilder, private spinner: NgxSpinnerService, private toaster: ToastrService) { }
  AddMaterial = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    boq_ref: ['', Validators.required],
    make: ['', Validators.required],
    uom: ['', Validators.required],
    total_quantity: ['', Validators.required],
    baseline_quantity: ['', Validators.required],
  });
  UpdateMaterial = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    boq_ref: ['', Validators.required],
    make: ['', Validators.required],
    uom: ['', Validators.required],
    total_quantity: ['', Validators.required],
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

// vendor list 

allvendors(){
  this.client_id = sessionStorage.getItem('client_id');
  this.adminservice.vendorslist(this.client_id).subscribe((res)=>{
    if(res){
      console.log(res);
      this.vendorlist = res;
      console.log(this.vendorlist);
    }
    else{
      console.warn(res);
    }
  },(error)=>{
    console.error(error.error.message);
    // this.spinner.hide();
  })
}


// view material

view(material_name:any,materialId:any,description:any,boq_ref:any,maker_name:any,total_qty:any,b_qty:any,uom:any){
$('#MaterialView').modal('show');
this.material_name = material_name,
this.materialId = materialId,
this.descriprion = description,
this.boq_ref = boq_ref,
this.maker_name = maker_name,
// this.total_uom = total_uom,
this.total_qty = total_qty,
this.uom = uom,
this.b_qty = b_qty,
$('#MaterialView').modal('show');
}

matclose(){
  $('#MaterialView').modal('hide');
}

// allmateriallist

  allmateriallist(){
    this.client_id = sessionStorage.getItem('client_id');
      this.spinner.show();
      this.adminservice.Materialslist(this.client_id).subscribe((res)=>{
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
      console.log('invalid');
      return
    }
    else {
      this.client_id = sessionStorage.getItem('client_id');
      this.vendor_id = this.AddMaterial.value.make;
      const mint = this
      const data = {
        "material_name": this.AddMaterial.value.name,
        "BOQ": this.AddMaterial.value.boq_ref,
        "description": this.AddMaterial.value.description,
        "Baseline_Quantity": this.AddMaterial.value.baseline_quantity,
        "UOM": this.AddMaterial.value.uom,
        "Total_Quantity": this.AddMaterial.value.total_quantity
      }
      console.log(data);
      this.adminservice.AddMaterial(this.client_id,this.vendor_id,data).subscribe((res) => {
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
        if(error.error.message){
        mint.toaster.error(error.error.message);
        }
        else{
        mint.toaster.error('Somthing went to wrong!');
        }
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