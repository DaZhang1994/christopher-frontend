import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { MDBBootstrapModulesPro } from '../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { ToastModule, ToastService } from '../../projects/ng-uikit-pro-standard/src/lib/pro/alerts';
import { MDBSpinningPreloader } from '../../projects/ng-uikit-pro-standard/src/lib/pro/preloader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ErrorModule } from './error/error.module';
import { GraphQLModule } from './graphql.module';
import { HeaderModule } from './header/header.module';
import { LandingModule } from './landing/landing.module';
import { RegisterModule } from './register/register.module';
import { UtilModule } from './util/util.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    AuthModule,
    UtilModule,
    HeaderModule,
    ErrorModule,
    LandingModule,
    RegisterModule,
    CommonModule,
  ],
  providers: [MDBSpinningPreloader, ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
