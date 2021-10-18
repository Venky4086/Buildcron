import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { VendorsComponent } from './vendors/vendors.component';
import { MaterialsComponent } from './materials/materials.component';
import { ReportsComponent } from './reports/reports.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EmployeesComponent } from './employees/employees.component';
import { QualityInspectionComponent } from './qualitychecklists/quality-inspection/quality-inspection.component';
import { QualityTestingDataComponent } from './qualitychecklists/quality-testing-data/quality-testing-data.component';
import { SafetyInspectionComponent } from './safetychecklists/safety-inspection/safety-inspection.component';
import { SafetyPermitsComponent } from './safetychecklists/safety-permits/safety-permits.component';
import { VendorLayoutComponent } from './Layouts/vendor-layout/vendor-layout.component';
import { SuperadminLayoutComponent } from './Layouts/superadmin-layout/superadmin-layout.component';
import { SuperdashboardComponent } from './superadmin/superdashboard/superdashboard.component';
import { RegistrationsComponent } from './superadmin/registrations/registrations.component';
import { LicenseComponent } from './superadmin/license/license.component';
import { LibrarylistComponent } from './superadmin/librarylist/librarylist.component';
import { SafetylibrarylistComponent } from './superadmin/safetylibrarylist/safetylibrarylist.component';
import { TestdatalibrarylistComponent } from './superadmin/testdatalibrarylist/testdatalibrarylist.component';
import { Testdatalibrarylist2Component } from './superadmin/testdatalibrarylist2/testdatalibrarylist2.component';
import { SupermaterialComponent } from './superadmin/supermaterial/supermaterial.component';
import { QueriesComponent } from './superadmin/queries/queries.component';
import { FeedbackComponent } from './superadmin/feedback/feedback.component';
import { FaqsComponent } from './superadmin/faqs/faqs.component';
import { QuestionsComponent } from './superadmin/questions/questions.component';
import { SuperreportsComponent } from './superadmin/superreports/superreports.component';
import { DailyComponent } from './reports/daily/daily.component';
import { SiteinstructionComponent } from './reports/siteinstruction/siteinstruction.component';
import { SitencComponent } from './reports/sitenc/sitenc.component';
import { BannersComponent } from './superadmin/banners/banners.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './guard/authguard.guard';
import { WebsiteregisterComponent } from './websiteregister/websiteregister.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SubscriptionordersComponent } from './subscriptionorders/subscriptionorders.component';
import { SafetyquestionComponent } from './superadmin/safetyquestion/safetyquestion.component';
import { CfaqsComponent } from './cfaqs/cfaqs.component';
import { CbannersComponent } from './cbanners/cbanners.component';
import { UsedlicenseComponent } from './superadmin/usedlicense/usedlicense.component';
import { SafetydashboardComponent } from './safetydashboard/safetydashboard.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  { path: '', redirectTo: '/Landingpage', pathMatch: 'full' },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path:'login', component:LoginComponent
  },
  {path:'Landingpage', component:LandingpageComponent},
  {path:'subscription', component:SubscriptionordersComponent},
  {path:'checkout', component:CheckoutComponent},
   { path: '',
    component: VendorLayoutComponent,canActivate: [AuthguardGuard],
    children: [
      { path: 'ClientAdmin',
        component: DashboardComponent
      },
      {
      path:'Safetydashboard',
      component:SafetydashboardComponent
      },
      { path: 'Employees',
    component: EmployeesComponent
 },
 { path: 'Projects',
    component: ProjectsComponent
 },
  { path: 'Vendors',
    component: VendorsComponent
  },
  { path: 'Materials',
    component: MaterialsComponent
  },
  { path: 'QualityInspection',
    component: QualityInspectionComponent
  },
  { path: 'QualityTestingData',
    component: QualityTestingDataComponent
   },
  { path: 'SafetyInspection',
    component: SafetyInspectionComponent
  },
  { path: 'SafetyPermits',
    component: SafetyPermitsComponent
   },
  { path: 'Reports',
    component: ReportsComponent
   },
   { path: 'DailyReport',
    component: DailyComponent
  },
  {
    path: 'SiteInstruction',
    component: SiteinstructionComponent
  },
  {
    path: 'SiteNCReport',
    component:SitencComponent
  },
  { path: 'Contactus',
    component: ContactusComponent
   },
   { path: 'cfaqs',
   component: CfaqsComponent
  },
  {
    path:'cbanners',
    component:CbannersComponent
  },
  {
    path:'changepassword',
    component:ChangepasswordComponent
  }
    ]
   },

   { path: '',
  component: SuperadminLayoutComponent,canActivate: [AuthguardGuard],
  children: [
    { path: 'SuperAdmin',
    component: SuperdashboardComponent
    },
    { path: 'Registrations',
    component: RegistrationsComponent
    },
    { path: 'License',
    component: LicenseComponent,
    },
    {
      path:'Usedlicense',component:UsedlicenseComponent
    },
    { path: 'QualityLibraryList',
    component: LibrarylistComponent
    },
    { path: 'TestdataLibrarylist',
      component: TestdatalibrarylistComponent
    },
    { path: 'SafetyLibraryList',
    component: SafetylibrarylistComponent
    },
    { path: 'SafetyQuestion',
    component: SafetyquestionComponent
    },
    { path: 'TestdataLibrarylist2',
      component: Testdatalibrarylist2Component
    },
    { path: 'SuperMaterials',
      component: SupermaterialComponent
    },
    { path: 'Queries',
      component: QueriesComponent
    },
    { path: 'Feedback',
      component: FeedbackComponent
    },
    { path: 'Faqs',
      component: FaqsComponent
    },
    { path: 'Questions',
    component: QuestionsComponent
  },
  { path: 'SuperReports',
    component: SuperreportsComponent
  },
  { path: 'Banners',
    component: BannersComponent
  },
  {
    path:'webregister', component:WebsiteregisterComponent
    }
  ]
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
