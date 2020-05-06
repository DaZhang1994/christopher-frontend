import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { PageNotFound } from './page_not_found/page_not_found.component';

@NgModule({
  declarations: [PageNotFound],
  imports: [CommonModule, RouterModule, MDBBootstrapModulesPro.forRoot()],
})
export class ErrorModule {}
