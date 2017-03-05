import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { TransactionsComponent } from './transactions/transactions.component';
import {DataService} from '../../core/qdata/src/DataService';
import {QDataModule} from "../../core/qdata/index";
import { HomeComponent } from './home/home.component';
import {StoreModule} from "@ngrx/store";
import {RouterStoreModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { reducer } from './reducers';
import {IndexPipe} from "./transactions/indexPipe";

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    HomeComponent,
    IndexPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QDataModule,
    routing,

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
