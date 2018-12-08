import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { PrincipalDashboardComponent } from './components/principal-dashboard/principal-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      { path: '', redirectTo: 'teacher', pathMatch: 'full' },
      { path: 'teacher', component: TeacherDashboardComponent },
      { path: 'principal', component: PrincipalDashboardComponent },
      { path: 'admin', component: AdminDashboardComponent },
      { path: 'parent', component:ParentDashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

//export const DashboardRoutingModule = RouterModule.forChild(routes);
