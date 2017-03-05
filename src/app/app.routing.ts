import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {TransactionsComponent} from "./transactions/transactions.component";


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'customers',
                component: TransactionsComponent,
                data: {
                    title : 'GENERAL.HOME'
                }
            }
        ]
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
