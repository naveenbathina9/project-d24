import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandardRoutingModule } from './standard-routing.module';
import { StandardComponent } from './standard.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CreateStandardComponent } from './component/create-standard/create-standard.component';
import { UpdateStandardComponent } from './component/update-standard/update-standard.component';
import { ListStandardComponent } from './component/list-standard/list-standard.component';
import { ViewStandardComponent } from './component/view-standard/view-standard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    StandardRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [StandardComponent, CreateStandardComponent, UpdateStandardComponent, ListStandardComponent, ViewStandardComponent]
})
export class StandardModule { }
