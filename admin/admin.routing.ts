import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {UserListComponent} from "./user/list/list.component";
import {UserDetailsComponent} from "./user/details/details.component";
import {AdminHomeComponent} from "./home/admin.home.component";


const routes: Routes = [
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent,
        data: {
          title : 'GENERAL.CUSTOMERS'
        }
      },
      {
        path: 'details/:id',
        component: UserDetailsComponent,
        data: {
          title : 'GENERAL.CUSTOMER'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class AdminRoutingModule {}
