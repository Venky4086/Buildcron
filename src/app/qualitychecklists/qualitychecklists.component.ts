import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-qualitychecklists',
  templateUrl: './qualitychecklists.component.html',
  styleUrls: ['./qualitychecklists.component.css']
})
export class QualitychecklistsComponent implements OnInit {

  constructor(private adminservice:AdminService,private modalService: NgbModal,private fb:FormBuilder,private spinner:NgxSpinnerService,private toaster:ToastrService) { }


  ngOnInit(): void {
  }

}
