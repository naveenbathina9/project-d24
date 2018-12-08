import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
  { 
    path:'', 
    component:UserManagementComponent, 
    children:[
    { path:'', redirectTo:'list', pathMatch:'full'  },
    { path:'list', component:ListUserComponent },
    { path:'create', component:CreateUserComponent },
    { path:'update', component:UpdateUserComponent},
    { path:'detail', component:ViewUserComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }