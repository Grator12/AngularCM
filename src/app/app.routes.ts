import {Routes} from '@angular/router';
import {BookListComponent} from './compoents/book-list/book-list.component';
import {authGuard} from "./guards/auth/auth.guard";
import {AuthorizationComponent} from "./compoents/authorization/authorization.component";
import {AppComponent} from "./app.component";
import {nonAuthGuard} from "./guards/non-auth/non-auth.guard";
import {HomeComponent} from "./compoents/home/home.component";

export const routes: Routes = [
  {
    path: 'library',
    component: BookListComponent,
    canActivate: [authGuard]
  },
  {
    path: "authorization",
    component: AuthorizationComponent,
    canActivate: [nonAuthGuard]
  },
  {
    path: "",
    component: HomeComponent,
    canActivate: [authGuard]
  },
  // {
  //   path: '**',
  //   component: BookListComponent
  // },
];
