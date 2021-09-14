import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProjectsComponent } from './projects/projects.component';
import { VendorsComponent } from './vendors/vendors.component';
import { MaterialsComponent } from './materials/materials.component';
import { QualitychecklistsComponent } from './qualitychecklists/qualitychecklists.component';
import { SafetychecklistsComponent } from './safetychecklists/safetychecklists.component';
import { ReportsComponent } from './reports/reports.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EmployeesComponent } from './employees/employees.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'ngx-easy-table';
import { QualityInspectionComponent } from './qualitychecklists/quality-inspection/quality-inspection.component';
import { QualityTestingDataComponent } from './qualitychecklists/quality-testing-data/quality-testing-data.component';
import { SafetyInspectionComponent } from './safetychecklists/safety-inspection/safety-inspection.component';
import { SafetyPermitsComponent } from './safetychecklists/safety-permits/safety-permits.component';
import { SuperdashboardComponent } from './superadmin/superdashboard/superdashboard.component';
import { VendorLayoutComponent } from './Layouts/vendor-layout/vendor-layout.component';
import { SuperadminLayoutComponent } from './Layouts/superadmin-layout/superadmin-layout.component';
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
import { HttpClientModule } from '@angular/common/http';
import { SuperadminService } from './services/superadmin.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { AdminService } from './services/admin.service';
import { BannersComponent } from './superadmin/banners/banners.component';
import { LoginComponent } from './login/login.component';
import { WebsiteregisterComponent } from './websiteregister/websiteregister.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SubscriptionordersComponent } from './subscriptionorders/subscriptionorders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegistrationService } from './services/registration.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectsComponent,
    VendorsComponent,
    MaterialsComponent,
    QualitychecklistsComponent,
    SafetychecklistsComponent,
    ReportsComponent,
    ContactusComponent,
    EmployeesComponent,
    QualityInspectionComponent,
    QualityTestingDataComponent,
    SafetyInspectionComponent,
    SafetyPermitsComponent,
    SuperdashboardComponent,
    VendorLayoutComponent,
    SuperadminLayoutComponent,
    RegistrationsComponent,
    LicenseComponent,
    LibrarylistComponent,
    SafetylibrarylistComponent,
    TestdatalibrarylistComponent,
    Testdatalibrarylist2Component,
    SupermaterialComponent,
    QueriesComponent,
    FeedbackComponent,
    FaqsComponent,
    QuestionsComponent,
    SuperreportsComponent,
    DailyComponent,
    SiteinstructionComponent,
    SitencComponent,
    BannersComponent,
    LoginComponent,
    WebsiteregisterComponent,
    LandingpageComponent,
    SubscriptionordersComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    FormsModule,
    NgApexchartsModule,
    NgbModule,
    TableModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [SuperadminService,AdminService,RegistrationService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
