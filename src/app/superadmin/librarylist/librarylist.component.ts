import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SuperadminService } from 'src/app/services/superadmin.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-librarylist',
  templateUrl: './librarylist.component.html',
  styleUrls: ['./librarylist.component.css']
})
export class LibrarylistComponent  {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  librarylists: any;
  library_id:any;
  typelists:any;
  date:any;
  quality_id:any;
  name:any;
  status:any;
  type: any;
  totalRecords:any;
  page:any=1;
  count:any = 5;
  constructor(private toaster: ToastrService,private spinner: NgxSpinnerService,private modalService: NgbModal,private fb:FormBuilder,private superadminserivce:SuperadminService,private router:Router) { } 
   AddLibrayList = this.fb.group({
      //  date:['', Validators.required],
      //  id:['', Validators.required],
       name:['', Validators.required],
      //  type:['', Validators.required],
      //  status:['', Validators.required]
   });
   UpdateLibrayList = this.fb.group({
    // date:['', Validators.required],
    // id:['', Validators.required],
    name:['', Validators.required],
    // type:['', Validators.required],
    // status:['', Validators.required]
});
   ngOnInit(){
    this.alllibrarylist();
    // this.types();
   }
   get f(){
     return this.AddLibrayList.controls
   }  
   get u(){
    return this.UpdateLibrayList.controls
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
 
  //  types

  types(){
    this.superadminserivce.types().subscribe((res)=>{
    if(res){
      console.log(res);
      this.typelists = res
    }
    else{
      console.warn(res);
    }
    },(error)=>{
      console.error(error.error.message);
    })
  }

  // librarylist

  alllibrarylist(){
    this.spinner.show();
    this.superadminserivce.alllibrarylist().subscribe((res)=>{
      if(res){
        console.log(res);
        this.librarylists = res;
        this.totalRecords = res.length;
        this.spinner.hide();
      }
      else{
        console.warn(res);
      }
    },(error)=>{
      console.log(error);
      this.spinner.hide();
    })
  }

  // add librarylist

  Add(){
    const mint = this
    this.submitted = true;
    if(this.AddLibrayList.invalid){
      return
    }
    else{
      const data = {
        "name":this.AddLibrayList.value.name,
        "typee":'Quality'
      }
      // const formDate = new FormData
      // formDate.append('date',this.AddLibrayList.value.date);
      // formDate.append('id',this.AddLibrayList.value.id);
      // formDate.append('name',this.AddLibrayList.value.name);
      // formDate.append('typee','Quality');
      // formDate.append('status',this.AddLibrayList.value.status)
      this.superadminserivce.Addlibrarylist(data).subscribe((res)=>{
        console.log(res);
          mint.toaster.success('Successfully Quality Done!');
          this.alllibrarylist();
          $('#AddQulaity').hide();
          this.AddLibrayList.reset();
          this.submitted = false;
      },(error)=>{
        console.error(error);
        mint.toaster.error('Somthing went to wrong');
        $('#AddQulaity').hide();
        this.AddLibrayList.reset();
        this.submitted = false;
      })
    }
  }

  // update library list

  view(id:any,quality_id:any,name:any){
    this.library_id = id;
    // this.date = date;
    // this.type = type;
    this.quality_id = quality_id;
    this.name  = name;
    // this.status = status
  }
  edit(id:any,quality_id:any,name:any){
      this.library_id = id;
      // this.date = date;
      // this.type = type;
      this.quality_id = quality_id;
      this.name  = name;
      // this.status = status
  } 

  Update(){
    const mint = this
  this.updatesubmitted = true;
  if(this.UpdateLibrayList.invalid){
    return
  }
  else{
  const data = {
    "name":this.UpdateLibrayList.value.name,
    "typee":'Quality'
  }
    // const formData = new FormData
      // formDate.append('date',this.UpdateLibrayList.value.date);
      // formDate.append('id',this.AddLibrayList.value.id);
      // formData.append('name',this.UpdateLibrayList.value.name);
      // formData.append('quality_type',this.UpdateLibrayList.value.type);
      // formData.append('status',this.UpdateLibrayList.value.status)
      this.superadminserivce.updatelibrarylist(this.library_id,data).subscribe((res)=>{
        console.log(res);
          mint.toaster.success('Successfully Quality Updated!');
          this.alllibrarylist();
          $('#UpdateQulaity').hide();
      },(error)=>{
        console.error(error);
        mint.toaster.error('Somthing went to wrong');
        $('#UpdateQulaity').hide();
      })
  }
  }

  // delete

  delete(id:any){
   this.library_id = id
  }

  Delete(){
    const mint = this;
    this.superadminserivce.deletelibrarylist(this.library_id).subscribe((res)=>{
      console.log(res);
      mint.toaster.success('Succesfully Quality Deleted!');
      this.alllibrarylist();
      $('#DeleteQulaity').hide();
    },(error)=>{
      console.error(error.error.message);
      mint.toaster.error('Somthing went to wrong');
      $('#DeleteQulaity').hide();
    })
  }

  quality_view(quality_id:any){
    sessionStorage.setItem('quality_id',quality_id);
    this.router.navigate(['/Questions']);
  }
}
