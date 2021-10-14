import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
import jsPDF from 'jspdf';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs ;
// import  htmlToPdfmake from 'html-to-pdfmake';
    
@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent  {
  count:number = 5;
  closeResult = '';
  totalRecords:any;
  page:any=1;
  AllReports: any;
  delete_id: any;
  report_name: any;
  report_type: any;
  report_submitted: any;
  report_status: any;
  report_project: any;

  // @ViewChild('pdf')pdf:ElementRef ;
  constructor(private toaster:ToastrService,private modalService: NgbModal,private adminservice:AdminService,private spinner:NgxSpinnerService) { 
  
  }

  ngOnInit(): void {
    this.allreports();
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

  allreports(){
    this.spinner.show();
    this.adminservice.allreports().subscribe((res)=>{
      if(res){
        console.log(res);
        this.AllReports = res;
        this.totalRecords = res.length;
        this.spinner.hide();
      }
      else{
        console.warn(res);
        this.spinner.hide();
      }
    },(error)=>{
      console.error(error);
      this.spinner.hide();
    });
  }

// delete

 delete(delete_id:any){
      this.delete_id = delete_id
 }

// delete

  Delete(){
  this.adminservice.deletereports(this.delete_id).subscribe((res)=>{
    console.log(res);
    this.toaster.success('Successfully Reports Deleted!');
    this.allreports();
    $('#DeleteReport').hide();
  },(error)=>{
    console.error(error);
    this.toaster.error('Somthing went to wrong!');
    $('#DeleteReport').hide();
  })
  }
  
// view

view(report_name:any,report_type:any,report_project:any,report_submitted_by:any,report_status:any){
    this.report_name = report_name;
    this.report_type = report_type;
    this.report_project = report_project;
    this.report_submitted = report_submitted_by;
    this.report_status = report_status;
}


// download

  download(){
    
    const doc = new jsPDF();
    
    // const pdfTable = this.pdf.nativeElement;
    
    // var html = htmlToPdfmake(pdfTable.innerHTML);
      
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open(); 

  }

}
