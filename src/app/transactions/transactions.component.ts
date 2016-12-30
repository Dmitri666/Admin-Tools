import { Component, OnInit } from '@angular/core';
import {TransactionsViewModel} from './TransactionViewModel';
import {Model} from './Model';
import {DataService} from '../../../core/qdata/src/DataService';
import {GlobalSettings} from "../constants/global-settings";
import {ContactsService} from "../services/contacts.service";
import {Observable} from "rxjs";
import {ContactDto} from "../model/generated/ContactDto";
import {QDescriptor} from "../../../core/qdata/src/QDescriptor";
import {TableView} from "./TableView";
import {QDescriptorBuilder} from "../../../core/qdata/src/QDescriptorBuilder";
import {NodeType} from "../../../core/qdata/src/QNode";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  contacts: Observable<Array<ContactDto>>;
  service: ContactsService;
  filter: any;

  constructor(service: ContactsService) {
    this.service = service;
    this.contacts = this.service.contacts;
    this.filter = {};
    this.refresh();

  }

  ngOnInit() {
  }

  getQueryDescriptor():QDescriptor {
    let builder = new QDescriptorBuilder<ContactDto>();
    
    let descriptor = builder.getQDescriptor();
    return descriptor;
  }

  refresh(){
    this.service.loadItems(this.getQueryDescriptor());
  }
}


