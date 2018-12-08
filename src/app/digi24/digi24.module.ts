import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Digi24RoutingModule } from './digi24-routing.module';
import { Digi24Component } from './digi24.component';
import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    Digi24RoutingModule
  ],
  declarations: [Digi24Component]
})
export class Digi24Module { }
