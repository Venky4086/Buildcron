import { Component } from '@angular/core';
import { createTrue } from 'typescript';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(){
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
  onActivate(event:any) {
    window.scroll(0,0);
  }
}
