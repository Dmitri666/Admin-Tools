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
import {AdminModule} from "../../admin/admin.module";


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
    AdminModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
