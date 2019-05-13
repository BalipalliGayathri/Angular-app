import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './route/app.route';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsermoduleComponent } from './components/usermodule/usermodule.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatCheckboxModule, MatDialogModule, MatToolbarModule, MatIconModule, MatCardModule, MatTableModule, MatChipsModule, MatAutocompleteModule, MatSortModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { UsermoduleService } from './services/usermodule.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment.prod';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { PaginatorModule } from 'primeng/paginator';
//import { RatingModule } from 'ngx-rating';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminTeamComponent } from './components/admin-team/admin-team.component';
import { YourTicketsComponent } from './components/your-tickets/your-tickets.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { TicketsAssignService } from './services/tickets-assign.service';
import { AssignAgentComponent } from './components/assign-agent/assign-agent.component';
import { DragulaModule } from 'ng2-dragula';
import { UsermanagementService } from './services/usermanagement.service';
import { AdminTeamChildComponent } from './components/admin-team-child/admin-team-child.component';
import { AdminTeamService } from './services/admin-team.service';
import { DashboardService } from './services/dashboard.service';
import * as firebase from 'firebase';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { ChartsModule } from 'ng2-charts';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FcmNotificationsService } from './services/fcm-notifications.service';
import { NotificationStorageService } from './services/notification-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsService } from './services/notifications.service';
import { ChartModule } from 'angular2-highcharts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { UsertickstatusComponent } from './components/usertickstatus/usertickstatus.component';
import { AdminrisingticktComponent } from './components/adminrisingtickt/adminrisingtickt.component';
import { HeadderNavbarComponent } from './components/headder-navbar/headder-navbar.component';
import { TicketsAssignComponent } from './components/tickets-assign/tickets-assign.component';
import { RatingModule } from './route/myrating';
import {MomentModule} from 'angular2-moment/moment.module';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';

//firebase installization
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsermoduleComponent,
    HeadderNavbarComponent,
    HomeComponent,
    DashboardComponent,
    TicketsAssignComponent,
    AdminTeamComponent,
    YourTicketsComponent,
    UserManagementComponent,
    AssignAgentComponent,
    AdminTeamChildComponent,
    NotificationsComponent,
    UsertickstatusComponent,
    AdminrisingticktComponent,
    ErrorpageComponent
   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MomentModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatSortModule,
    MatRippleModule,
    FormsModule,
    MyDatePickerModule,
    ChartsModule,
    RatingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    MyDateRangePickerModule,
    AccordionModule,
    PaginatorModule,
    DragulaModule.forRoot(),
    Ng2GoogleChartsModule,
    ],
  providers: [
    LoginService,
    UsermoduleService,
    TicketsAssignService,
    UsermanagementService,
    AdminTeamService,
    DashboardService,
    NotificationStorageService,
    FcmNotificationsService,
    NotificationsService,
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
