import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user.component';
import {UserDetailsComponent} from './details/details.component';
import {UserListComponent} from './list/list.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'list',
                component: UserListComponent,
                data: {
                    title : 'GENERAL.USERS',
                    isTabbed: true,
                    partialMatch: true,
                    activeUrl: '/admin/users'
                }
            },
            {
                path: 'details/:id',
                component: UserDetailsComponent,
                data: {
                    title : 'GENERAL.USERS',
                    isTabbed: true,
                    partialMatch: true,
                    activeUrl: '/admin/users'
                }
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class UserAdministrationRoutingModule { }
