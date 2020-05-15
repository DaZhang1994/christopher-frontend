import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { UtilModule } from '../util/util.module';
import { ThreadComponent } from './thread.component';

@NgModule({
  declarations: [ThreadComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    UtilModule,
    RouterModule
  ]
})
export class ThreadModule { }
