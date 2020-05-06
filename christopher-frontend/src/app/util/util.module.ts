import { NgModule } from '@angular/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { TokenService } from './services/token.service';

@NgModule({
  declarations: [],
  imports: [MDBBootstrapModulesPro.forRoot()],
  providers: [TokenService],
  exports: [],
})
export class UtilModule {}
