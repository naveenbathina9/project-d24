import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { CreateStudentComponent } from './component/create-student/create-student.component';
import { ListStudentComponent } from './component/list-student/list-student.component';
import { UpdateStudentComponent } from './component/update-student/update-student.component';
import { ViewStudentComponent } from './component/view-student/view-student.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [
    StudentComponent, 
    CreateStudentComponent, 
    ListStudentComponent, 
    UpdateStudentComponent, 
    ViewStudentComponent
  ]
})
export class StudentModule { }
