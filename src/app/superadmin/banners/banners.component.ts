import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SuperadminService } from 'src/app/services/superadmin.service';
declare var $:any;
@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  closeResult = '';
  submitted = false;
  updatesubmitted = false;
  BannerLists: any;
  file:any;
  banner_id: any;
  banner_name: any;
  banner_image: any;
  images:any=[];
  totalRecords:any;
  page:any = 1;
  constructor(private toastr: ToastrService,private spinner: NgxSpinnerService,private modalService: NgbModal,private fb:FormBuilder,private superadminserivce:SuperadminService) { }
  AddBanner = this.fb.group({
    name:['', Validators.required],
    image:['', Validators.required],
  });
  UpdateBanner = this.fb.group({
    banner_name:['', Validators.required],
    banner_image:['', Validators.required],
  });
  ngOnInit(): void {
    this.list();
  }

  get f(){
    return this.AddBanner.controls
  }

  get u(){
    return this.UpdateBanner.controls
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

  OnFileSelect(event:any){
    console.log(event);
    this.file = event.target.files[0];
    console.log(this.file);
    // this.AddBanner.patchValue({
    //   banner_image: this.file.name
    // });
    // this.AddBanner.value.banner_image.setValue(file);
    // this.image = this.UpdateProfileForm.get('image').setValue(file);
  }


  onFileChange(event:any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files;
        console.log(filesAmount);
        for (let i = 0; i < event.target.files.length; i++) {
                var reader = new FileReader();
                let arr1:any[] = []
                reader.onload = (event:any) => {
                  // console.log(event.target.result);
                   this.images.push(filesAmount); 
                  //  this.images = arr1
                   this.AddBanner.patchValue({
                      fileSource: this.images
                   });
                }
  
                reader.readAsDataURL(event.target.files[i]);
        }
      }
    }

  // list

  list(){
    this.spinner.show();
    this.superadminserivce.Listbanner().subscribe((res)=>{
       if(res){
       console.log(res);
       this.BannerLists = res;
       this.totalRecords = res.length;
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
   if(this.AddBanner.invalid){
     return
   }
   else{
     console.log(this.images);
     const data = {
       "image":this.file,
       "name":this.AddBanner.value.banner_name
     }
     const formData = new FormData
     formData.append('name',this.AddBanner.value.name),
     formData.append('images',this.file)
    //  console.log(data);
     console.log(formData);
    // console.log(this.AddBanner.value);
     this.superadminserivce.Addbanner(formData).subscribe((res)=>{
       console.log(res);
       this.toastr.success('Successfully Banners Uploaded!');
       this.list();
       $('#Addbanner').hide();
       this.AddBanner.reset();
       this.submitted = false;
     },(error)=>{
       console.error(error);
       $('#Addbanner').hide();
       this.AddBanner.reset();
       this.submitted = false;
       if(error.error.name){
        this.toastr.error(error.error .name[0]);
       }else{
        this.toastr.error('Somthing went to wrong');
       }
     })
   }
  }


// view
view(banner_id:any,banner_name:any,banner_image:any){
  this.banner_id = banner_id,
  this.banner_name = banner_name,
  this.banner_image = banner_image
  }

  // Update

  edit(banner_id:any,banner_name:any,banner_image:any){
  this.banner_id = banner_id,
  this.banner_name = banner_name,
  this.banner_image = banner_image
  }

  Update(){
    this.updatesubmitted = true;
    if(this.UpdateBanner.invalid){
      return
    }
    else{
       const formData = new FormData
       formData.append('name',this.UpdateBanner.value.banner_name)
       formData.append('images',this.file)
       this.superadminserivce.updatebanner(this.banner_id,formData).subscribe((res)=>{
        console.log(res);
        this.toastr.success('Successfully Banner Updated!');
        this.list();
        $('#Updatebanner').hide();
      },(error)=>{
        console.error(error);
        this.toastr.error('Somthing went to wrong');
        $('#Updatebanner').hide();
      })
    }
  }

  delete(banner_id:any){
    this.banner_id = banner_id
  }

  Delete(){
    this.superadminserivce.deletebanner(this.banner_id).subscribe((res)=>{
      console.log(res);
       this.toastr.success('Successfully Banner Deleted!');
       this.list();
       $('#Deletebanner').hide();
     },(error)=>{
       console.error(error);
       this.toastr.error('Somthing went to wrong');
       $('#Deletebanner').hide();
     })
  }

}
