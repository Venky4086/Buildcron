import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-layout',
  templateUrl: './vendor-layout.component.html',
  styleUrls: ['./vendor-layout.component.css']
})
export class VendorLayoutComponent implements OnInit {
  opened = true;
  title: any;
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  client_name = sessionStorage.getItem('client_name');
  client_company_name =sessionStorage.getItem('company_name');
  license_count = sessionStorage.getItem('license_purchased');
  constructor(private router:Router) { }

  ngOnInit(): void {
    // window.scroll(0,0);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  // client_name(){
  //   return sessionStorage.getItem('first_name');
  // }
  client_count(){
    return sessionStorage.getItem('license_purchased');
  }
  onActivate(event:any) {
    window.scroll(0,0);
  }
  // logout(){

  // }
  changepassword(){
    this.router.navigate(['/changepassword']);
  }
  license(){
    this.router.navigate(['/licensedetails'])
  }
}
