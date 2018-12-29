import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { CreateStudentComponent } from './component/create-student/create-student.component';
import { UpdateStudentComponent } from './component/update-student/update-student.component';
import { ViewStudentComponent } from './component/view-student/view-student.component';
import { ListStudentComponent } from './component/list-student/list-student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: ListStudentComponent },
      { path: 'create', component: CreateStudentComponent },
      { path: 'update', component: UpdateStudentComponent },
      { path: 'view', component: ViewStudentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
