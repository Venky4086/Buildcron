import { Component } from '@angular/core';
import { createTrue } from 'typescript';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = true;
  title: any;
  public isCollapsed1 = true;
  public isCollapsed2 = true;

  onActivate(event:any) {
    window.scroll(0,0);
  }
}
