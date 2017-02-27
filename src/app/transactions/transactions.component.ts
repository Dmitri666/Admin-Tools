import { Component, OnInit } from '@angular/core';
import {TransactionsViewModel} from './TransactionViewModel';
import {Model} from './Model';
import {DataService} from '../../../core/qdata/src/DataService';
import {GlobalSettings} from "../constants/global-settings";
import {Store} from "@ngrx/store";
import * as contacts from '../reducers/customers';
import {LoadAction, AddCustomerAction, SelectContactAction} from "../actions/collection";
import {QDescriptor} from "../../../core/qdata/src/QDescriptor";
import {ContactDto} from "../model/generated/ContactDto";
import {NodeType, QNode} from "../../../core/qdata/src/QNode";
import {Observable} from "rxjs";
import {getLoadedContacts, AppState, selectedContactSelector} from "../reducers/index";
import {CustomerDto} from "../model/generated/CustomerDto";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  public viewModel: TransactionsViewModel;
  customers$: Observable<Array<CustomerDto>>;
  selectedContact$: Observable<ContactDto>;

  constructor(private dataService: DataService,private store: Store<AppState>) {
    let dataModel = new Model(dataService, GlobalSettings.API_ENDPOINT + '/contact');
    this.viewModel = new TransactionsViewModel(dataModel);
    //this.viewModel.refresh();

    this.customers$ = store.select(getLoadedContacts);
    //this.customers$.subscribe(res => console.log(res));

    this.selectedContact$ = store.select(selectedContactSelector);
    this.selectedContact$.subscribe(res => console.log(res));
  }

  ngOnInit() {
  }

  load() {
    let query: QNode = {
      Type: NodeType.Querable,
      Value: ''
    };
    let descroiptor = new QDescriptor();
    descroiptor.Root = query;
    let result =  this.dataService.getAll<CustomerDto>(descroiptor, GlobalSettings.API_ENDPOINT + '/customer').subscribe(
      res =>
      this.store.dispatch(new LoadAction(res)),
    );
  }

  add() {
    let customerDto = new CustomerDto();
    customerDto.id = 333;
    this.store.dispatch(new AddCustomerAction(customerDto));
  }

  select (customer:CustomerDto,contact:ContactDto) {
    this.store.dispatch(new SelectContactAction({customer,contact}));
  }
}
