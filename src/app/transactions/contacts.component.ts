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
import {ItemDetail} from "./item-detail.component";
import {ItemsList} from "./items-list.component";

@Component({
  selector: 'contacts',
  template: `
  <div class="mdl-grid items">
    <div class="mdl-cell mdl-cell--6-col">
      <items-list [items]="contacts | async"
        (selected)="selectItem($event)" (deleted)="deleteItem($event)">
      </items-list>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <item-detail
        (saved)="saveItem($event)" (cancelled)="resetItem($event)"
        [item]="selectedItem | async">Select an Item</item-detail>
    </div>
  </div>
  `,
  styles: [`
    .items {
      padding: 20px;
    }
  `]

})
export class ContactsComponent implements OnInit {
  contacts: Observable<Array<ContactDto>>;

  filter: any;

  constructor(private service: ContactsService) {
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


