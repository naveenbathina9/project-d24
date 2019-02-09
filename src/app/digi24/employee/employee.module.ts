import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ],
  declarations: [EmployeeComponent, CreateEmployeeComponent, UpdateEmployeeComponent, ListEmployeeComponent, ViewEmployeeComponent]
})
export class EmployeeModule { }
