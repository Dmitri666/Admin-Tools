import {Routes, RouterModule} from '@angular/router';
import {ContactsComponent} from './transactions/contacts.component';
import {ModuleWithProviders} from '@angular/core';
import {HomeComponent} from "./home/home.component";


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'contacts',
                component: ContactsComponent,
                data: {
                    title : 'GENERAL.HOME'
                }
            }
        ]
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
