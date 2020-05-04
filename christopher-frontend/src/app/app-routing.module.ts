import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PageNotFound } from './error/page_not_found/page_not_found.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path: '', component: HeaderComponent},
  {path: 'auth', component: HeaderComponent, children: [
    {path: '', component: AuthComponent}]
  },
  {path: '**', component: HeaderComponent, children: [
    {path: '', component: PageNotFound}]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
