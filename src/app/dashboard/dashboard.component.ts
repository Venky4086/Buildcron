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
  project_list: any[]= []
  quality: any;
  total_inspections: any;
  success_percent: any;

  project = true;
  employee_list = false;
  vendor_list = false;
  project_id: any;
  selectedObject:any;
  site_observation: any;
  ncr: any;

  constructor(private clientadmin:ClientAdmindashboardService) { 
  }

  ngOnInit(): void {
    this.projectlist();
    // console.log(this.selectedObject);
    // this.defaultproject();
  }

  
  projectlist(){
    this.clientadmin.Projectslist().subscribe((res)=>{
     if(res){
      console.log(res);
      this.project_list = res;
      this.project_list.filter((
        project,index
      )=>{
        if(index == (this.project_list.length - 1)){
           this.project_id = project.project_id;
           console.log(this.project_id);
           this.defaultproject();
        }
      })
     }
     else{
       console.warn(res);
     }
    },(error)=>{
      console.error(error);
    })
  }
  defaultproject(){
    this.clientadmin.SingleProjectslist(this.project_id).subscribe((res)=>{
      console.log(res);
      this.quality = res.quality;
      this.total_inspections = this.quality.total_inspections;
      this.success_percent = this.quality.success_percent;
      this.site_observation = this.quality.site_observation;
      this.ncr = this.quality.ncr;
    },(error)=>{
      console.error(error);
    })
  }
  onChange(project_id:any) {
    console.log(project_id.target.value);
    this.project_id = project_id.target.value;
    this.clientadmin.SingleProjectslist(this.project_id).subscribe((res)=>{
      console.log(res);
      this.quality = res.quality;
      this.total_inspections = this.quality.total_inspections;
      this.success_percent = this.quality.success_percent;
      this.site_observation = this.quality.site_observation;
      this.ncr = this.quality.ncr;
    },(error)=>{
      console.error(error);
    })
    // this.selectedObject = deviceValue.target.value;
    // console.log("name",this.selectedObject);
    // this.quality = this.selectedObject.quality,
    // this.total_inspections = this.selectedObject.quality.total_inspections,
    // this.success_percent = this.selectedObject.quality.success_percent
  }

  // barchart project

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['11-10-2021', '12-10-2021', '13-10-2021', '14-10-2021', '15-10-2021', '16-10-2021', '17-10-2021','11-10-2021', '12-10-2021', '13-10-2021', '14-10-2021', '15-10-2021', '16-10-2021', '17-10-2021'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'No of Inspection (Closed)' },
    { data: [28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90], label: 'No of Inspection (Open)' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#1d9eff' },
    { backgroundColor: '#ff781d' },
  ]


  // barchart Employee

  public barEmployeeChartOptions: ChartOptions = {
    responsive: true,
  };
  public barEmployeeChartLabels: Label[] = ['Abhis', 'Aditya', 'Amit', 'Mahesh', 'Rohit', 'Yash', 'Ankit'];
  public barEmployeeChartType: ChartType = 'bar';
  public barEmployeeChartLegend = true;
  public barEmployeeChartPlugins = [];

  public barEmployeeChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'No of Inspection (Closed)' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'No of Inspection (Open)' }
  ];

  public barEmployeeChartColors: Color[] = [
    { backgroundColor: '#1d9eff' },
    { backgroundColor: '#ff781d' },
  ]


  // barchart Vendor

  public barVendorChartOptions: ChartOptions = {
    responsive: true,
  };
  public barVendorChartLabels: Label[] = ['Vendor-1', 'Vendor-2', 'Vendor-3', 'Vendor-4', 'Vendor-5', 'Vendor-6', 'Vendor-7'];
  public barVendorChartType: ChartType = 'bar';
  public barVendorChartLegend = true;
  public barVendorChartPlugins = [];

  public barVendorChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'No of Inspection (Closed)' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'No of Inspection (Open)' }
  ];

  public barVendorChartColors: Color[] = [
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

// horizontal bar chart project

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


// horizontal bar chart Employee

public EmployeebarhorizontalChartOptions: ChartOptions = {
  responsive: true
};
public EmployeebarhorizontalChartType: ChartType = 'horizontalBar';
public EmployeebarhorizontalChartLegend = true;
public EmployeebarhorizontalChartData: ChartDataSets[] = [
  { data: [1, 2, 3,4,5,6,7,8,9], label: 'Percentage Inspection Till Data (%)', stack: 'a' },
  // { data: [1, 2, 3], label: 'Accepted', stack: 'a' },
  // { data: [1, 2, 3], label: 'Open', stack: 'a' },
  // { data: [1, 2, 3], label: 'In Progress', stack: 'a' },
];
public EmployeebarhorizontalChartLabels: string[] = ['P', 'R', 'B','J', 'M', 'R', 'T', 'I'];
public EmployeebarHorizontalChartColors: Color[] = [
  // { backgroundColor: '#ff781d' },
  { backgroundColor: '#1d9eff' },
]

// events
// public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
//   console.log(event, active);
// }

public EmployeecharthorizontalHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}


// horizontal bar chart Vendor

public VendorbarhorizontalChartOptions: ChartOptions = {
  responsive: true
};
public VendorbarhorizontalChartType: ChartType = 'horizontalBar';
public VendorbarhorizontalChartLegend = true;

public VendorbarhorizontalChartData: ChartDataSets[] = [
  { data: [1, 2, 3,4,5,6,7,8,9], label: 'Percentage Inspection Till Data (%)', stack: 'a' },
  // { data: [1, 2, 3], label: 'Accepted', stack: 'a' },
  // { data: [1, 2, 3], label: 'Open', stack: 'a' },
  // { data: [1, 2, 3], label: 'In Progress', stack: 'a' },
];
public VendorbarhorizontalChartLabels: string[] = ['P', 'R', 'B','J', 'M', 'R', 'T', 'I'];
public VendorbarHorizontalChartColors: Color[] = [
  // { backgroundColor: '#ff781d' },
  { backgroundColor: '#1d9eff' },
]

// events
// public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
//   console.log(event, active);
// }

public VendorcharthorizontalHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
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
