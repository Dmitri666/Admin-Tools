import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { TransactionsComponent } from './transactions/transactions.component';
import {QDataModule} from "../../core/qdata/index";
import { HomeComponent } from './home/home.component';
import {contactsReducer} from "./reducers/contactsReducer";
import {ContactsService} from "./services/contacts.service";
import {ContactsList} from "./transactions/contacts-list.component";


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    HomeComponent,
    ContactsList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QDataModule,
    routing,
    StoreModule.provideStore({contactsReducer })
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
