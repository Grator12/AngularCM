import {Routes} from '@angular/router';
import {BookListComponent} from './compoents/book-list/book-list.component';

export const routes: Routes = [
  {
    path: 'library',
    component: BookListComponent
  },
  // {
  //   path: '**',
  //   component: BookListComponent
  // },
];
