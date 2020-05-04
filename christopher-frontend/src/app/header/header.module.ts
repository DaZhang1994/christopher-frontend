import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    MDBBootstrapModulesPro.forRoot()
  ]
})
export class HeaderModule { }
