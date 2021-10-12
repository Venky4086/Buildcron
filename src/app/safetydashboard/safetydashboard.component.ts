import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ClientAdmindashboardService } from '../services/client-admindashboard.service';

@Component({
  selector: 'app-safetydashboard',
  templateUrl: './safetydashboard.component.html',
  styleUrls: ['./safetydashboard.component.css']
})
export class SafetydashboardComponent implements OnInit {
  project_list: any;
  selectedObject: any;
  safety: any;
  total_inspections: any;
  success_percent: any;
  vendor_list = false;
  project = true;

  constructor(private clientadmin:ClientAdmindashboardService) { 
  }
 data:any;
  ngOnInit(): void {
    this.projectlist();
  }

  projectlist(){
    this.clientadmin.Projectslist().subscribe((res)=>{
     if(res){
      console.log(res);
      this.project_list = res;
     }
     else{
       console.warn(res);
     }
    },(error)=>{
      console.error(error);
    })
  }
  onChange(deviceValue:any) {
    console.log(JSON.stringify(deviceValue.target.value));
    // this.selectedObject = deviceValue.target.value;
    console.log(this.selectedObject);
    this.safety = this.selectedObject.safety ,
    this.total_inspections = this.selectedObject.safety.total_inspections,
    this.success_percent = this.selectedObject.safety.success_percent
  }

  // analysis

    analysis(event:any){
    if(event.target.value == 'Project Analysis'){
      this.project = true;
      this.vendor_list = false;
    }
    else{
      this.project = false;
      this.vendor_list = true;
    }
    }


// barchart 

public barChartOptions: ChartOptions = {
  responsive: true,
};
public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];

public barChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'General Inspection (Closed)' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Work Permits Issues' }
];

public barChartColors: Color[] = [
  { backgroundColor: '#00b050' },
  { backgroundColor: '#1d9eff' },
]

// site pie inspection

public pieChartLabels:string[] = ['Closed', 'Open'];
public pieChartData:number[] = [90,20];
public pieChartType:any = 'pie';

public pieChartColors: Array < any > = [{
  backgroundColor: ['#1d9eff', '#fbbc05'],
  borderColor: ['#1d9eff', '#fbbc05']
}];

// public pieChartPlugins = [{
//   beforeDraw(chart:any, easing:any) {
//     const ctx = chart.ctx;
//     const chartArea = chart.chartArea;
//     const top = chartArea.top; // Use a value of 0 here to include the legend

//     ctx.save();
//     ctx.fillStyle = 'red';

//     ctx.fillRect(chartArea.left, top, chartArea.right - chartArea.left, chartArea.bottom - top);
//     ctx.restore();
//   }
// }];

// public pieChartColors: Color[] = [
//  { backgroundColor: '#ff781d' },
//  { backgroundColor: '#1d9eff' },
// ]
// events
public chartPClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

   // Safety Pie

   public QalitypieChartLabels:string[] = ['Closed', 'Open'];
   public QalitypieChartData:number[] = [90, 20];
   public QalitypieChartType:any = 'pie';
   public QalitypieChartColors: Array < any > = [{
    backgroundColor: ['#1d9eff', '#ff5033'],
    borderColor: ['#1d9eff', '#ff5033']
 }];
  //  public QalitypieChartColors: Color[] = [
  //   { backgroundColor: '#ff781d' },
  //   { backgroundColor: '#1d9eff' },
  // ]
   // events
   public QalitychartPClicked(e:any):void {
     console.log(e);
   }
  
   public QalitychartHovered(e:any):void {
     console.log(e);
   }

// vendor bar chart

public barvendorChartOptions: ChartOptions = {
  responsive: true,
};
public barvendorChartLabels: Label[] = ['Vendor-1', 'Vendor-2', 'Vendor-3', 'Vendor-3', 'Vendor-4', 'Vendor-5', 'Vendor-6'];
public barvendorChartType: ChartType = 'bar';
public barvendorChartLegend = true;
public barvendorChartPlugins = [];

public barvendorChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Inspection & Permits' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Site Inspection' },
  { data: [10, , 10, 0, 0, 10, 0,10], label: 'NCRs' },
];

public barvendorChartColors: Color[] = [
  { backgroundColor: '#1d9eff' },
  { backgroundColor: '#00b050' },
  { backgroundColor: '#ff6347' },
]




}
