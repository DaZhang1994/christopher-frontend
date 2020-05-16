import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { UtilModule } from '../util/util.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostLandingComponent } from './post-landing/post-landing.component';
import { PostListingComponent } from './post-listing/post-listing.component';


@NgModule({
  declarations: [PostLandingComponent, PostListingComponent, PostDetailComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    UtilModule,
    RouterModule
  ]
})
export class PostModule { }
