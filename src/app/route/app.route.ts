import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../components/login/login.component';
import { UsermoduleComponent } from '../components/usermodule/usermodule.component';
import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TicketsAssignComponent } from '../components/tickets-assign/tickets-assign.component';
import { AdminTeamComponent } from '../components/admin-team/admin-team.component';
import { UserManagementComponent } from '../components/user-management/user-management.component';
import { YourTicketsComponent } from '../components/your-tickets/your-tickets.component';
import { AssignAgentComponent } from '../components/assign-agent/assign-agent.component';
import { AdminTeamChildComponent } from '../components/admin-team-child/admin-team-child.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { UsertickstatusComponent } from '../components/usertickstatus/usertickstatus.component';
import { AdminrisingticktComponent } from '../components/adminrisingtickt/adminrisingtickt.component';
import { ErrorpageComponent } from '../components/errorpage/errorpage.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { path: 'login', component: LoginComponent },
    {
        // path: 'userPanel',
        path: 'dashboard',
        component: UsermoduleComponent
    },
    {
        // path: 'userTicketDetails',
        path: 'ticket/:id',
        component: UsertickstatusComponent
    },
    {
        path: 'admin',
        component: HomeComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'notifications',
                component: NotificationsComponent
            },
            {
                // path: 'ticketsAssign',
                path: 'assign',
                component: TicketsAssignComponent
            },
            {
                // path: 'adminTeam',
                path: 'team',
                component: AdminTeamComponent
            },
            {
                // path: 'userManagement',
                path: 'user-management',
                component: UserManagementComponent
            },
            {
                // path: 'yourTickets',
                path: 'my-tickets',
                component: YourTicketsComponent
            },
            {
                // path: 'agentAssignPanel',
                path: 'ticket',
                component: AssignAgentComponent
            },
            {
                // path: 'adminTeamDetails',
                path: 'team-member',
                component: AdminTeamChildComponent
            },
            {
                path: 'my-ticket',
                component: AdminrisingticktComponent
            }
        ]
    },
    { path: '**', component: ErrorpageComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
