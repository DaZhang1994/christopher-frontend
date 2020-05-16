import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { UtilModule } from '../util/util.module';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { PeopleLandingComponent } from './people-landing/people-landing.component';
import { PeopleListingComponent } from './people-listing/people-listing.component';


@NgModule({
  declarations: [PeopleLandingComponent, PeopleListingComponent, PeopleDetailComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    UtilModule,
    RouterModule,
    DragDropModule
  ]
})
export class PeopleModule { }
