import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { UtilModule } from '../util/util.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    UtilModule,
    MDBBootstrapModulesPro.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  providers: [],
})
export class AuthModule {}
