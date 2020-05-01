import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { ToastModule } from '../../../projects/ng-uikit-pro-standard/src/lib/pro/alerts';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class AuthModule { }
