import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin.routing";
import {UserDetailsComponent} from "./user/details/details.component";
import {UserListComponent} from "./user/list/list.component";
import {AdminHomeComponent} from "./home/admin.home.component";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule

  ],
  declarations: [UserDetailsComponent,UserListComponent,AdminHomeComponent],
  providers: []
})

export class AdminModule { }
