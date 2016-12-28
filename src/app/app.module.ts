import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { TransactionsComponent } from './transactions/transactions.component';
import {DataService} from '../../core/qdata/src/DataService';
import {QDataModule} from "../../core/qdata/index";
import { HomeComponent } from './home/home.component';
import { transactionsReducer } from './reducers/transactionsReducer';


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QDataModule,
    routing,
    StoreModule.provideStore({ counter: transactionsReducer })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
