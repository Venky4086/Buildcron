import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';
declare var $:any;
@Component({
  selector: 'app-safetylibrarylist',
  templateUrl: './safetylibrarylist.component.html',
  styleUrls: ['./safetylibrarylist.component.css']
})


export class SafetylibrarylistComponent {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  safety_id:any;
  safetylibrarylists: any;
  typelists: any;
  date:any;
  quality_id:any;
  name:any;
  status:any;
  type: any;
  totalRecords:any;
  page:any = 1;
  count:any =10;
  excel!:File;
  constructor(private fb:FormBuilder,private modalService: NgbModal,private toaster:ToastrService,private superadminservice:SuperadminService, private spinner:NgxSpinnerService,private router:Router) { }
  AddSafetyLibraryList = this.fb.group({
    // date:['', Validators.required],
    // id:['', Validators.required],
    name:['', Validators.required],
    // type:['', Validators.required],
    // status:['', Validators.required]
  });
  UpdateSafetyLibraryList = this.fb.group({
    // date:['', Validators.required],
    // id:['', Validators.required],
    name:['', Validators.required],
    // type:['', Validators.required],
    // status:['', Validators.required]
  });
  ngOnInit(){
   this.allsafetylibrarylist();
  //  this.types();
  }
  get f(){
    return this.AddSafetyLibraryList.controls
  }
  get u(){
    return this.UpdateSafetyLibraryList.controls
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

  types(){
    this.superadminservice.types().subscribe((res)=>{
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

  allsafetylibrarylist(){
    this.spinner.show();
    this.superadminservice.allsaftylibrarylist().subscribe((res)=>{
       if(res){
         console.log(res);
         this.safetylibrarylists = res;
         this.totalRecords = res.length;
         this.spinner.hide();
       }
       else{
         console.warn(res);
       }
    },(error)=>{
      console.error(error);
      this.spinner.hide();
    });
  }

  // Add

    Add(){
      this.submitted = true;
      if(this.AddSafetyLibraryList.invalid){
        return
      }
      else{
        console.log(this.AddSafetyLibraryList.value);
        const mint = this
        const data = {
          "name": this.AddSafetyLibraryList.value.name,
          "typee": "Safety",
        }

        this.superadminservice.Addsaftylibrarylist(data).subscribe((res)=>{
          console.log(res);
          mint.toaster.success('Successfully Safty done!');
          this.allsafetylibrarylist();
          $('#AddSafety').hide();
          this.AddSafetyLibraryList.reset();
          this.submitted = false;
        },(error)=>{
          console.error(error);
          mint.toaster.error('Somthing went wrong');
          $('#AddSafety').hide();
          this.AddSafetyLibraryList.reset();
          this.submitted = false;
        })
      }
        }


    //UPLOAD EXCEL FILE
    excelfile(event:any){
      console.log(event.target.files[0])
      this.excel=<File>event.target.files[0];
      const formData=new FormData;
      formData.append("file",this.excel,this.excel.name)
      this.superadminservice.ExcelUploadsaftylibrary(formData).subscribe((res)=>{
        console.log(res.message)
      })

    }


    view(id:any,quality_id:any,name:any){
      this.safety_id = id;
      // this.date = date;
      // this.type = type;
      this.quality_id = quality_id;
      this.name  = name;

      // this.status = status
  }
    edit(id:any,quality_id:any,name:any){
        // $("#UpdateSafety").modal('show');
        this.safety_id = id;
        // this.date = date;
        // this.type = type;
        this.quality_id = quality_id;
        this.name  = name;
        // this.status = status;
        // $("#UpdateSafety").modal('show');
    }

  // update

  Update(){
    this.updatesubmitted = true;
    if(this.UpdateSafetyLibraryList.invalid){
      return
    }
    else{
      const mint = this
      const data = {
        "name": this.UpdateSafetyLibraryList.value.name,
        "status": this.UpdateSafetyLibraryList.value.status==="Active" ? true : false,
      }
      console.log(this.safety_id)
      this.superadminservice.updatesaftylibrarylist(this.safety_id,data).subscribe((res)=>{
        console.log(res);
        mint.toaster.success('Succefully Update!');
        // this.allsafetylibrarylist();
        $("#UpdateSafety").hide();
      },(error)=>{
        console.error(error);
        mint.toaster.error('Somthing went to wrong');
        $("#UpdateSafety").hide();
      })
    }
  }

// delete

  delete(id:any){
    this.safety_id = id

  }
  Delete(){
    const mint = this;
    this.superadminservice.deletesaftylibrarylist(this.safety_id).subscribe((res)=>{
      console.log(res);
      mint.toaster.success('Successfully deleted!');
      this.allsafetylibrarylist();
      $("#DeleteSafety").hide();
    },(error)=>{
      console.error(error.error.message);
      mint.toaster.error('Somthing went wrong');
      $("#DeleteSafety").hide();
    })
  }

  checklistdetails(safety_id:any){
  sessionStorage.setItem('safety_id',safety_id);
  this.router.navigate(['/SafetyQuestion'])
  }


}

