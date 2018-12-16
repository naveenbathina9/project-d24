import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Digi24Component } from './digi24.component';

const routes: Routes = [
  {
    path: 'digi24',
    component: Digi24Component,
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
        { path: 'manageuser', loadChildren: './user-management/user-management.module#UserManagementModule' },
        { path: 'standard', loadChildren: './standard/standard.module#StandardModule' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Digi24RoutingModule { }
