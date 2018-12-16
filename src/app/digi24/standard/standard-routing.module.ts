import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandardComponent } from './standard.component';
import { ListStandardComponent } from './component/list-standard/list-standard.component';
import { CreateStandardComponent } from './component/create-standard/create-standard.component';
import { UpdateStandardComponent } from './component/update-standard/update-standard.component';
import { ViewStandardComponent } from './component/view-standard/view-standard.component';

const routes: Routes = [{
  path: '',
  component: StandardComponent,
  children: [
    { path: '', redirectTo: 'list' },
    { path: 'list', component: ListStandardComponent },
    { path: 'create', component: CreateStandardComponent },
    { path: 'update', component: UpdateStandardComponent },
    { path: 'view', component: ViewStandardComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRoutingModule { }
