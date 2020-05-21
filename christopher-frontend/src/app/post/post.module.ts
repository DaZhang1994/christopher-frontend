import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MdbFileUploadModule } from 'mdb-file-upload';
import { QuillModule } from 'ngx-quill';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { UtilModule } from '../util/util.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostLandingComponent } from './post-landing/post-landing.component';


@NgModule({
  declarations: [PostLandingComponent, PostEditComponent, PostDetailComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    UtilModule,
    RouterModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MdbFileUploadModule
  ],
})
export class PostModule { }
