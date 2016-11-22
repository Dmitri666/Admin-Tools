import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TransactionsComponent } from './transactions/transactions.component';
import {DataService} from '../../core/qdata/src/DataService';
import {QDataModule} from "../../core/qdata/index";

@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QDataModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
