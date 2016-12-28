import {Routes, RouterModule} from '@angular/router';
import {TransactionsComponent} from './transactions/transactions.component';
import {ModuleWithProviders} from '@angular/core';
import {HomeComponent} from "./home/home.component";


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'transactions',
                component: TransactionsComponent,
                data: {
                    title : 'GENERAL.HOME'
                }
            }
        ]
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
