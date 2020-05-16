import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PageNotFound } from './error/page_not_found/page_not_found.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { PeopleDetailComponent } from './people/people-detail/people-detail.component';
import { PeopleLandingComponent } from './people/people-landing/people-landing.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostLandingComponent } from './post/post-landing/post-landing.component';
import { RegisterComponent } from './register/register.component';
import { ThreadDetailComponent } from './thread/thread-detail/thread-detail.component';
import { ThreadLandingComponent } from './thread/thread-landing/thread-landing.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
        pathMatch: 'full'
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
        pathMatch: 'full'
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
        pathMatch: 'full'
      },
    ],
  },
  {
    path: 'threads',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: ThreadLandingComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: ThreadDetailComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        component: PageNotFound,
      },
    ],
  },
  {
    path: 'posts',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: PostLandingComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: PostDetailComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        component: PageNotFound,
      },
    ],
  },
  {
    path: 'people',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: PeopleLandingComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: PeopleDetailComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        component: PageNotFound,
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
      onSameUrlNavigation: 'reload'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
