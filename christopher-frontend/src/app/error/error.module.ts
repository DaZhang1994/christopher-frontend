import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { PageNotFound } from './page_not_found/page_not_found.component';

@NgModule({
  declarations: [PageNotFound],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    RouterModule,
  ],
})
export class ErrorModule { }
