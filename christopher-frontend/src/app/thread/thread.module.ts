import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MdbFileUploadModule } from 'mdb-file-upload';
import { QuillModule } from 'ngx-quill';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { UtilModule } from '../util/util.module';
import { ComposePostComponent } from './compose-post/compose-post.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadLandingComponent } from './thread-landing/thread-landing.component';
import { ThreadComponent } from './thread.component';

@NgModule({
  declarations: [ThreadComponent, ThreadLandingComponent, ThreadDetailComponent, ComposePostComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    UtilModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MdbFileUploadModule,
    QuillModule.forRoot()
  ]
})
export class ThreadModule { }
