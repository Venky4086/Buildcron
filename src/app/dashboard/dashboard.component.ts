import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ClientAdmindashboardService } from '../services/client-admindashboard.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  project_list: any;
  quality: any;
  total_inspections: any;
  success_percent: any;

  project = true;
  employee_list = false;
  vendor_list = false;

  constructor(private clientadmin:ClientAdmindashboardService) { 
  }
  selectedObject:any;
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
    console.log("name",this.selectedObject);
    this.quality = this.selectedObject.quality,
    this.total_inspections = this.selectedObject.quality.total_inspections,
    this.success_percent = this.selectedObject.quality.success_percent
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
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'No of Inspection (Closed)' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'No of Inspection (Open)' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#1d9eff' },
    { backgroundColor: '#ff781d' },
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

   // Qality Pie

   public QalitypieChartLabels:string[] = ['Closed', 'Open'];
   public QalitypieChartData:number[] = [90, 20];
   public QalitypieChartType:any = 'pie';
   public QalitypieChartColors: Array < any > = [{
    backgroundColor: ['#1d9eff', '#ff6347'],
    borderColor: ['#1d9eff', '#ff6347']
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

// horizontal bar chart

public barhorizontalChartOptions: ChartOptions = {
  responsive: true
};
public barhorizontalChartType: ChartType = 'horizontalBar';
public barhorizontalChartLegend = true;

public barhorizontalChartData: ChartDataSets[] = [
  { data: [1, 2, 3,4,5,6,7,8,9], label: 'Percentage Inspection Till Data (%)', stack: 'a' },
  // { data: [1, 2, 3], label: 'Accepted', stack: 'a' },
  // { data: [1, 2, 3], label: 'Open', stack: 'a' },
  // { data: [1, 2, 3], label: 'In Progress', stack: 'a' },
];
public barhorizontalChartLabels: string[] = ['P', 'R', 'B','J', 'M', 'R', 'T', 'I'];
public barHorizontalChartColors: Color[] = [
  // { backgroundColor: '#ff781d' },
  { backgroundColor: '#1d9eff' },
]

// events
// public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
//   console.log(event, active);
// }

public charthorizontalHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public randomize(): void {
  // Only Change 3 values
  const data = [
    Math.round(Math.random() * 100),
    59,
    80,
    (Math.random() * 100),
    56,
    (Math.random() * 100),
    40];
  const clone = JSON.parse(JSON.stringify(this.barChartData));
  clone[0].data = data;
  this.barChartData = clone;
  /**
   * (My guess), for Angular to recognize the change in the dataset
   * it has to change the dataset variable directly,
   * so one way around it, is to clone the data, change it and then
   * assign it;
   */
}

// analysis

  Analysis(event:any){
    console.log(event.target.value);
    if(event.target.value == 'Employee Analysis'){
      this.project = false;
      this.employee_list  = true;
      this.vendor_list = false;
    }
    else if(event.target.value == 'Vendor Analysis'){
      this.project = false;
      this.vendor_list = true;
      this.employee_list  = false;
    }
    else{
      this.project = true;
      this.employee_list  = false;
      this.vendor_list = false;
    }
  }

}
