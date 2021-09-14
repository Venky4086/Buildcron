import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }


}
