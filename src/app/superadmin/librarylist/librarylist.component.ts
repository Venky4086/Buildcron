import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SuperadminService } from 'src/app/services/superadmin.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  excel!:File;
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
      }

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
  //EXCEL QUALITY CHECKLIST UPLOAD
  excelfile(file:any)
{
  this.excel=<File>file.target.files[0];
  const formData= new FormData();
  formData.append("file",this.excel,this.excel.name)
  this.superadminserivce.ExcelUploadQualitylibrary(formData).subscribe(
    (res)=>{
      console.log(res)
      this.toaster.success("Quality checklist created")
    }
  )
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
    "status":this.UpdateLibrayList.value.name=="Active"?true:false,
  }
      console.log(data)
      console.log(this.library_id)
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

  delete(quality_id:any){
   this.quality_id = quality_id
  }

  Delete(){
    const mint = this;
    this.superadminserivce.deletelibrarylist(this.quality_id).subscribe((res)=>{
      console.log(res);
      if (res.status)
      {
        mint.toaster.success('Succesfully Quality Deleted!');
        this.alllibrarylist();
        $('#DeleteQulaity').hide();

      }
      else{
        console.error(res.message);
        mint.toaster.error('Somthing went to wrong');
        $('#DeleteQulaity').hide();

      }

    },)
  }

  quality_view(quality_id:any){
    console.log(quality_id);
    sessionStorage.setItem('quality_id',quality_id);
    this.router.navigate(['/Questions']);
  }
}
