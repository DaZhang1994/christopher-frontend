import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { UtilModule } from '../util/util.module';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadLandingComponent } from './thread-landing/thread-landing.component';
import { ThreadComponent } from './thread.component';

@NgModule({
  declarations: [ThreadComponent, ThreadLandingComponent, ThreadDetailComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    UtilModule,
    RouterModule
  ]
})
export class ThreadModule { }
