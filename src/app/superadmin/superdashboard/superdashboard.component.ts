import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superdashboard',
  templateUrl: './superdashboard.component.html',
  styleUrls: ['./superdashboard.component.css']
})
export class SuperdashboardComponent implements OnInit {
  opened = true;
  title: any;
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  constructor() { }

  ngOnInit(): void {
  }

}
