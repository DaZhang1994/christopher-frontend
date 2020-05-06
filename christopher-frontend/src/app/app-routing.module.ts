import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PageNotFound } from './error/page_not_found/page_not_found.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
    ],
  },
  {
    path: 'login',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: AuthComponent,
      },
    ],
  },
  {
    path: 'register',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '**',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: PageNotFound,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
