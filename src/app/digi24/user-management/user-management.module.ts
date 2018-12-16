import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Logger, LOG_LOGGER_PROVIDERS , Options as LoggerOptions, Level as LoggerLevel } from "angular2-logger/core";

@NgModule({
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    UserManagementComponent, 
    CreateUserComponent, 
    UpdateUserComponent, 
    ListUserComponent, 
    ViewUserComponent
  ],
  providers: [ Logger, LOG_LOGGER_PROVIDERS ]
})
export class UserManagementModule { }
